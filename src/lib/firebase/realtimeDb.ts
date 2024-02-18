import type { GameState, PlayerState, UpdateGameState } from "@/types/firebase";
import { increment, ref, update } from "firebase/database";
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

export const getNextTurnUpdateData = (gameState: GameState) => {
  const { turn, order } = gameState;
  const nextTurn = (turn + 1) % order.length;
  return {
    turn: nextTurn,
    round: gameState.round < 12 ? increment(1) : 1,
    year: gameState.round < 12 ? gameState.year : increment(1),
  };
};
