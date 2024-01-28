import type { PlaceId, ActionType } from ".";

export type FirebaseCollection = "games" | "rooms";

export interface GameState {
  year: number;
  round: number;
  turn: number;
  goal?: PlaceId;
  order: string[];
  isBotTurn?: boolean;
  state: "beforeGame" | "playing" | "afterGame";
  players: {
    [playerId: string]: {
      place?: PlaceId;
      balance: number;
      action?: ActionType;
      movedTo?: PlaceId;
      itemId?: string;
      cashAmount?: number;
      assets: {
        [assetId: string]: number;
      };
    };
  };
}
