import type { PlayerState } from "@/types/firebase";
import { ref, update } from "firebase/database";
import { realtimeDb } from "./init";

export const updatePlayerState = (
  gameId: string,
  playerId: string,
  state: Partial<PlayerState>,
) => {
  const playerRef = ref(realtimeDb, `/games/${gameId}/players/${playerId}`);
  return update(playerRef, state);
};
