export type Environment = "production" | "preview" | "development";

export type PlaceRole = "asset" | "income" | "expense" | "item";
export type PlaceCategory = "city" | "town" | "store"; // Size or category of the place
export type CashVolume = "low" | "medium" | "high"; // For income and expense places
export type RouteKind = "air" | "land" | "sea";
export type Asset = {
  name: string;
  price: number;
  profitRate: number;
};

export type AppPlaceConfig = {
  coordinates: { lat: number; lng: number };
  role: PlaceRole;
  assets?: {
    id: string;
    price: number;
    profitRate: number;
  }[];
  items?: string[]; // For item places
  cashVolume?: CashVolume;
};

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
    role: PlaceRole;
    icon: string;
    assets?: Asset[];
    items?: string[];
    cashVolume?: CashVolume;
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
