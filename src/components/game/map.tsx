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
import {
  generatePlaceGeoJson,
  generatePulsingPlaceGeoJson,
  generateRouteGeoJson,
} from "@/lib/geoJson";
import { PlaceFeature, PlaceId } from "@/types";
import AssetSheet from "./asset-sheet";
import { GameState } from "@/types/firebase";
import { Marker as MarkerGl } from "react-map-gl";
import Marker from "./marker";
import { createPulsingDot } from "@/lib/canvas";
import { moveMarker } from "@/lib/turf";
import { ALL_PLACES } from "@/constants/placeList";

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
  nthPlaces,
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
  nthPlaces: PlaceId[] | undefined;
}) {
  const [viewState, setViewState] = useState(defaultPosition);
  const [places] = useState(generatePlaceGeoJson());
  const [routes] = useState(generateRouteGeoJson());
  const [assetPlaceId, setAssetPlaceId] = useState<PlaceId | null>(null);
  const [coordinates, setCoordinates] = useState(ALL_PLACES.paris?.coordinates); // for testing

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
      onLoad={(e) => {
        const map = e.target;
        map.addImage("pulsing-dot", createPulsingDot(map), { pixelRatio: 2 });
      }}
      onMouseEnter={(e) => {
        if (getAssetProperties(e)) {
          e.target.getCanvas().style.cursor = "pointer";
        }
      }}
      onMouseLeave={(e) => {
        if (getAssetProperties(e)) {
          const map = e.target;
          map.getCanvas().style.cursor = "";
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

      {nthPlaces && nthPlaces.length > 0 && (
        <Source
          id="pulsing-places"
          type="geojson"
          data={generatePulsingPlaceGeoJson(nthPlaces)}
        >
          <Layer
            id="pulsing-places"
            type="symbol"
            source="pulsing-places"
            beforeId="places"
            layout={{
              "icon-image": "pulsing-dot",
              "icon-allow-overlap": true,
            }}
          />
        </Source>
      )}
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
            "icon-allow-overlap": true,
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
      <MarkerGl
        longitude={coordinates?.lng!}
        latitude={coordinates?.lat!}
        anchor="bottom"
        style={{ width: "46px", height: "46px" }}
        onClick={() => {
          moveMarker(
            ["paris", "nantes", "bordeaux", "pau", "sanSebastian"],
            setCoordinates,
          );
        }}
      >
        <img src="/markers/white" />
      </MarkerGl>
    </MapGl>
  );
}
