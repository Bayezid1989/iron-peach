import type { PlayerState, UpdateGameState } from "@/types/firebase";
import { ref, update } from "firebase/database";
import { realtimeDb } from "./init";

export const updateGameState = (
  gameId: string,
  state: Partial<UpdateGameState> & Record<string, any>,
) => {
  const gameRef = ref(realtimeDb, `/games/${gameId}`);
  return update(gameRef, state);
};

export const updatePlayerState = (
  gameId: string,
  playerId: string,
  state: Partial<PlayerState>,
) => {
  const playerRef = ref(realtimeDb, `/games/${gameId}/players/${playerId}`);
  return update(playerRef, state);
};
