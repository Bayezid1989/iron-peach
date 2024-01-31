import { ICON_MAP } from "@/constants";
import { PLACE_NAME_DICTIONARY } from "@/constants/dictionary/map";
import { ALL_PLACES } from "@/constants/placeList";
import { ROUTES } from "@/constants/routes";
import {
  BaseFeature,
  BaseFeatureCollection,
  PlaceFeature,
  PlaceFeatureCollection,
  PlaceId,
  RouteFeature,
  RouteFeatureCollection,
} from "@/types";

export const generatePulsingPlaceGeoJson = (placeIds: PlaceId[]) => {
  const features: BaseFeature[] = placeIds.map((placeId) => {
    const place = ALL_PLACES[placeId];

    if (!place) throw new Error("Invalid place config");
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [place.coordinates.lng, place.coordinates.lat],
      },
      properties: {},
    };
  });
  const geoJson: BaseFeatureCollection = {
    type: "FeatureCollection",
    features: features,
  };
  return geoJson;
};

export const generatePlaceGeoJson = (lang: "en" = "en") => {
  const features: PlaceFeature[] = Object.entries(ALL_PLACES).map((entry) => {
    const placeId = entry[0] as PlaceId;
    const place = entry[1];

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [place.coordinates.lng, place.coordinates.lat],
      },
      properties: {
        name: PLACE_NAME_DICTIONARY[placeId][lang],
        placeId: placeId,
        icon: ICON_MAP[place.role],
      },
    };
  });
  const geoJson: PlaceFeatureCollection = {
    type: "FeatureCollection",
    features: features,
  };
  return geoJson;
};

export const generateRouteGeoJson = () => {
  const features: RouteFeature[] = ROUTES.map((route) => {
    const from = ALL_PLACES[route.places[0]];
    const to = ALL_PLACES[route.places[1]];
    if (!from || !to) throw new Error("Invalid route config");

    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [from.coordinates.lng, from.coordinates.lat],
          [to.coordinates.lng, to.coordinates.lat],
        ],
      },
      properties: {
        kind: route.kind,
      },
    };
  });
  const geoJson: RouteFeatureCollection = {
    type: "FeatureCollection",
    features: features,
  };
  return geoJson;
};
