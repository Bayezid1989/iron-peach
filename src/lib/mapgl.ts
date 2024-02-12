import { ICON_MAP } from "@/constants";
import { PlaceFeature, PlaceId } from "@/types";
import { MapLayerMouseEvent } from "react-map-gl";

export const getAssetProperties = (e: MapLayerMouseEvent) => {
  if (e.features?.[0]?.layer.id === "places") {
    const properties = e.features?.[0]
      ?.properties as PlaceFeature["properties"];
    if (properties.icon === ICON_MAP.asset) {
      return properties;
    }
  }
  return null;
};

export const geVisitablePlaceProperties = (
  e: MapLayerMouseEvent,
  visitablePlaces: PlaceId[],
) => {
  if (!visitablePlaces.length) return null;

  if (e.features?.[0]?.layer.id === "places") {
    const properties = e.features?.[0]
      ?.properties as PlaceFeature["properties"];
    return visitablePlaces.includes(properties.placeId) ? properties : null;
  }
  return null;
};
