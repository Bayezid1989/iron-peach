"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { MAP_STYLES } from "@/constants";
import { useState } from "react";
import MapGl, { Layer, NavigationControl, Source } from "react-map-gl";
import {
  generatePlaceGeoJson,
  generatePulsingPlaceGeoJson,
  generateRouteGeoJson,
} from "@/lib/geoJson";
import { PlaceId } from "@/types";
import AssetSheet from "./asset-sheet";
import Marker from "./marker";
import { createPulsingDot } from "@/lib/canvas";
import { getGame } from "@/server/queries/game";
import { geVisitablePlaceProperties, getAssetProperties } from "@/lib/mapgl";
import MoveConfirmDialog from "./move-confirm-dialog";
import useGameState from "@/hooks/use-game-state";
import usePossiblePaths from "@/hooks/use-possible-paths";

const defaultPosition = {
  longitude: 23.727539,
  latitude: 37.98381,
  zoom: 4,
  pitch: 20,
};

export default function Map({
  gameId,
  turnPlayerId,
  players,
}: {
  gameId: string;
  turnPlayerId: string;
  players: NonNullable<Awaited<ReturnType<typeof getGame>>>["players"];
}) {
  const [viewState, setViewState] = useState(defaultPosition);
  const [places] = useState(generatePlaceGeoJson());
  const [routes] = useState(generateRouteGeoJson());
  const [assetPlaceId, setAssetPlaceId] = useState<PlaceId | null>(null);
  const [moveToPlaceId, setMoveToPlaceId] = useState<PlaceId | null>(null);
  const { gameState } = useGameState();
  const possiblePaths = usePossiblePaths();
  const visitablePlaces = possiblePaths.map((p) => p[p.length - 1]);

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
        if (
          geVisitablePlaceProperties(e, visitablePlaces) ||
          getAssetProperties(e)
        ) {
          e.target.getCanvas().style.cursor = "pointer";
        }
      }}
      onMouseLeave={(e) => {
        if (
          geVisitablePlaceProperties(e, visitablePlaces) ||
          getAssetProperties(e)
        ) {
          const map = e.target;
          map.getCanvas().style.cursor = "";
        }
      }}
      onClick={(e) => {
        const properties = geVisitablePlaceProperties(e, visitablePlaces);
        if (properties) {
          setMoveToPlaceId(properties.placeId);
        } else {
          const assetPeoperties = getAssetProperties(e);
          if (assetPeoperties) {
            e.preventDefault();
            setAssetPlaceId(assetPeoperties.placeId as PlaceId);
          }
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

      {possiblePaths.length > 0 && (
        <Source
          id="pulsing-places"
          type="geojson"
          data={generatePulsingPlaceGeoJson(visitablePlaces)}
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
      <MoveConfirmDialog
        placeId={moveToPlaceId}
        setPlaceId={setMoveToPlaceId}
        gameId={gameId}
        turnPlayerId={turnPlayerId}
      />
      {players.map(
        (player) =>
          gameState?.players[player.user.id].coordinates && (
            <Marker
              key={player.user.id}
              playerId={player.user.id}
              coordinates={gameState.players[player.user.id].coordinates}
              playerImageUrl={player.user.imageUrl}
            />
          ),
      )}
    </MapGl>
  );
}
