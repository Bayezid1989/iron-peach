import { ALL_PLACES } from "@/constants/placeList";
import { Coordinates, PlaceId } from "@/types";
import * as turf from "@turf/turf";

// https://docs.mapbox.com/mapbox-gl-js/example/animate-point-along-route/
export const getAlongCoordinates = (
  originId: PlaceId,
  destinationId: PlaceId,
  steps: number,
  // Number of steps to use in the arc and animation, more steps means
  // a smoother arc and animation, but too many steps will result in a
  // low frame rate
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
  const lineDistance = turf.length(feature);
  const arc: turf.helpers.Point["coordinates"][] = [];

  // Draw an arc between the `origin` & `destination` of the two points
  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(feature, i);
    arc.push(segment.geometry.coordinates);
  }
  return arc;
};

export const moveMarker = (
  originId: PlaceId,
  destinationId: PlaceId,
  updateCoordinates: (coordinates: Coordinates) => void,
  steps: number = 500,
) => {
  const arc = getAlongCoordinates(originId, destinationId, steps);
  let counter = 0;

  const animate = () => {
    if (counter < steps) {
      updateCoordinates({ lat: arc[counter][1], lng: arc[counter][0] });
      counter = counter + 1;
      requestAnimationFrame(animate);
    }
  };
  animate();
};
