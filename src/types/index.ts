import type { ACTION_TYPES, MAP_TYPES, PLACE_IDS } from "@/constants/db";

export type Environment = "production" | "preview" | "development";
export type PlaceId = (typeof PLACE_IDS)[number];
export type ActionType = (typeof ACTION_TYPES)[number];
export type MapType = (typeof MAP_TYPES)[number];
export type PlaceRole = "asset" | "income" | "expense" | "item";
export type PlaceCategory = "city" | "town" | "store"; // Size or category of the place
export type CashVolume = "low" | "medium" | "high"; // For income and expense places
export type RouteKind = "air" | "land" | "sea";
export type Asset = {
  id: string;
  price: number;
  profitRate: number;
};

export type Coordinates = { lat: number; lng: number };

export type AssetPlace = {
  coordinates: Coordinates;
  role: "asset";
  assets: Asset[];
};

export type IncomeExpensePlace = {
  coordinates: Coordinates;
  role: "income" | "expense";
  cashVolume: CashVolume;
};

export type ItemPlace = {
  coordinates: Coordinates;
  role: "item";
  items: string[];
};

export type APIResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type BaseFeature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {};
};

export type PlaceFeature = BaseFeature & {
  properties: {
    name: string;
    placeId: PlaceId;
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

export type BaseFeatureCollection = {
  type: "FeatureCollection";
  features: BaseFeature[];
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
