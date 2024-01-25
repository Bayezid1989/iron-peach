import "mapbox-gl/dist/mapbox-gl.css";
import { MAP_STYLES } from "@/constants";
import { PlaceFeatureCollection, RouteFeatureCollection } from "@/types";
import { useState } from "react";
import MapGl, { Layer, NavigationControl, Source } from "react-map-gl";
import placeGeo from "@/json/placeGeo.json";
import routeGeo from "@/json/routeGeo.json";

const defaultPosition = {
  longitude: 23.727539,
  latitude: 37.98381,
  zoom: 4,
  pitch: 20,
};

export default function Map() {
  const [viewState, setViewState] = useState(defaultPosition);
  const [places, setPlaces] = useState(placeGeo as PlaceFeatureCollection);
  const [routes, setRoutes] = useState(routeGeo as RouteFeatureCollection);

  return (
    <MapGl
      {...viewState}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle={MAP_STYLES.custom.basic}
      projection={{ name: "globe" }}
      style={{ width: "100%", height: "100%" }}
      terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
    >
      <NavigationControl position="bottom-right" visualizePitch={true} />
      <Source
        id="mapbox-dem"
        type="raster-dem"
        url="mapbox://mapbox.mapbox-terrain-dem-v1"
        tileSize={512}
        maxzoom={14}
      />
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
    </MapGl>
  );
}
