import { PlaceId } from "@/server/db/schema";

export type Environment = "production" | "preview" | "development";

export type PlaceRole = "asset" | "income" | "expense" | "item";
export type PlaceCategory = "city" | "town" | "store"; // Size or category of the place
export type CashVolume = "low" | "medium" | "high"; // For income and expense places
export type RouteKind = "air" | "land" | "sea";
export type Asset = {
  id: string;
  price: number;
  profitRate: number;
};

type ConditionalAppConfig =
  | { role: "asset"; assets: Asset[] }
  | { role: "income" | "expense"; cashVolume: CashVolume }
  | { role: "item"; items: string[] };

export type AppPlaceConfig = {
  coordinates: { lat: number; lng: number };
  role: PlaceRole;
} & ConditionalAppConfig;

export type APIResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type PlaceFeature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    name: string;
    placeId: string;
    icon: string;
  };
};

export type RouteFeature = {
  type: "Feature";
  geometry: {
    type: "LineString";
    coordinates: [[number, number], [number, number]];
  };
  properties: {
    kind: RouteKind;
  };
};

export type PlaceFeatureCollection = {
  type: "FeatureCollection";
  features: PlaceFeature[];
};

export type RouteFeatureCollection = {
  type: "FeatureCollection";
  features: RouteFeature[];
};

export type RouteConfig = {
  places: [PlaceId, PlaceId];
  kind: RouteKind;
};
