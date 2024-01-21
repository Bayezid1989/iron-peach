export type Environment = "production" | "preview" | "development";

export type PlaceRole = "asset" | "income" | "expense" | "item";
export type PlaceCategory = "city" | "town" | "store"; // Size or category of the place
export type CashVolume = "low" | "medium" | "high"; // For income and expense places

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
