"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { ICON_MAP, MAP_STYLES } from "@/constants";
import { useState } from "react";
import MapGl, {
  Layer,
  MapLayerMouseEvent,
  NavigationControl,
  Source,
} from "react-map-gl";
import { generatePlaceGeoJson, generateRouteGeoJson } from "@/lib/geoJson";
import { PlaceFeature, PlaceId } from "@/types";
import AssetSheet from "./asset-sheet";
import { GameState } from "@/types/firebase";
import Marker from "./marker";

const defaultPosition = {
  longitude: 23.727539,
  latitude: 37.98381,
  zoom: 4,
  pitch: 20,
};

const getAssetProperties = (e: MapLayerMouseEvent) => {
  if (e.features?.[0]?.layer.id === "places") {
    const properties = e.features?.[0]
      ?.properties as PlaceFeature["properties"];
    if (properties.icon === ICON_MAP.asset) {
      return properties;
    }
  }
  return null;
};

export default function Map({
  gameState,
  players,
}: {
  gameState: GameState;
  players: {
    order: number | null;
    user: {
      id: string;
      username: string;
      imageUrl: string | null;
    };
  }[];
}) {
  const [viewState, setViewState] = useState(defaultPosition);
  const [places] = useState(generatePlaceGeoJson());
  const [routes] = useState(generateRouteGeoJson());
  const [assetPlaceId, setAssetPlaceId] = useState<PlaceId | null>(null);

  return (
    <MapGl
      {...viewState}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onMove={(e) => setViewState(e.viewState)}
      mapStyle={MAP_STYLES.custom.basic}
      projection={{ name: "globe" }}
      style={{ width: "100%", height: "100%" }}
      terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      interactiveLayerIds={["places"]}
      onMouseEnter={(e) => {
        if (getAssetProperties(e)) {
          e.target.getCanvas().style.cursor = "pointer";
        }
      }}
      onMouseLeave={(e) => {
        if (getAssetProperties(e)) {
          e.target.getCanvas().style.cursor = "";
        }
      }}
      onClick={(e) => {
        const assetPeoperties = getAssetProperties(e);
        if (assetPeoperties) {
          e.preventDefault();
          setAssetPlaceId(assetPeoperties.placeId as PlaceId);
        }
      }}
    >
      <NavigationControl position="bottom-right" visualizePitch={true} />
      <Source
        id="mapbox-dem"
        type="raster-dem"
        url="mapbox://mapbox.mapbox-terrain-dem-v1"
        tileSize={512}
        maxzoom={14}
      />
      <Source id="routes" type="geojson" data={routes}>
        <Layer
          id="routes"
          type="line"
          source="routes"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "#c9c9c7",
            "line-width": 4,
          }}
        />
      </Source>
      <Source id="places" type="geojson" data={places}>
        <Layer
          id="places"
          type="symbol"
          source="places"
          layout={{
            "icon-image": ["get", "icon"],
            "text-size": 16,
            "text-field": ["get", "name"],
            // 'text-font': ['Open Sans Semibold'],
            "text-offset": [0, 0.8],
            "text-anchor": "top",
          }}
        />
      </Source>
      <AssetSheet placeId={assetPlaceId} setPlaceId={setAssetPlaceId} />
      {players.map((player) => (
        <Marker
          key={player.user.id}
          playerId={player.user.id}
          player={gameState.players[player.user.id]}
          playerImageUrl={player.user.imageUrl}
        />
      ))}
    </MapGl>
  );
}
