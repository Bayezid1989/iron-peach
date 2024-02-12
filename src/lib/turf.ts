import { ALL_PLACES } from "@/constants/placeList";
import { Coordinates, PlaceId } from "@/types";
import * as turf from "@turf/turf";

// https://docs.mapbox.com/mapbox-gl-js/example/animate-point-along-route/
const getAlongCoordinates = (
  originId: PlaceId,
  destinationId: PlaceId,
  kmPer1Step = 20,
) => {
  const origin = ALL_PLACES[originId]?.coordinates;
  const destination = ALL_PLACES[destinationId]?.coordinates;

  const feature: GeoJSON.Feature<GeoJSON.LineString> = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [
        [origin?.lng!, origin?.lat!],
        [destination?.lng!, destination?.lat!],
      ],
    },
    properties: null,
  };
  // Calculate the distance in kilometers between route start/end point.
  const lineDistance = turf.length(feature, { units: "kilometers" });
  const arc: turf.helpers.Point["coordinates"][] = [];

  // Draw an arc between the `origin` & `destination` of the two points
  for (let i = 0; i < lineDistance; i += kmPer1Step) {
    const segment = turf.along(feature, i);
    arc.push(segment.geometry.coordinates);
  }
  arc.push([destination?.lng!, destination?.lat!]);
  return arc;
};

export const moveMarker = (
  path: PlaceId[],
  updateCoordinates: (coordinates: Coordinates) => void,
) => {
  const arc: turf.helpers.Point["coordinates"][] = [];
  for (let i = 0; i < path.length - 1; i++) {
    arc.push(...getAlongCoordinates(path[i], path[i + 1]));
  }

  let counter = 0;

  const animate = () => {
    if (counter < arc.length) {
      updateCoordinates({ lat: arc[counter][1], lng: arc[counter][0] });
      counter = counter + 1;
      requestAnimationFrame(animate);
    }
  };
  animate();
};
