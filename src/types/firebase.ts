import type { PlaceId, ActionType, Coordinates } from ".";

export type FirebaseCollection = "games" | "rooms";

export type PlayerState = {
  place?: PlaceId;
  coordinates?: Coordinates;
  balance: number;
  action?: ActionType | null;
  diceResult?: number | null;
  itemId?: string | null;
  cashAmount?: number;
  assets: {
    [assetId: string]: number;
  };
};

export interface GameState {
  year: number;
  round: number;
  turn: number;
  goal?: PlaceId;
  order: string[];
  isBotTurn?: boolean;
  state: "beforeGame" | "playing" | "afterGame";
  players: {
    [playerId: string]: PlayerState;
  };
}
