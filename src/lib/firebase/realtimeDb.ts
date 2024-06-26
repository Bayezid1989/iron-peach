import type { GameState, PlayerState, UpdateGameState } from "@/types/firebase";
import { increment, ref, update } from "firebase/database";
import { realtimeDb } from "./init";
import { ALL_PLACES } from "@/constants/placeList";

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

const getNextTurnUpdateData = (gameState: GameState) => {
  const { turn, order } = gameState;
  const nextTurn = (turn + 1) % order.length;
  return {
    turn: nextTurn,
    round: gameState.round < 12 ? increment(1) : 1,
    year: gameState.round < 12 ? gameState.year : increment(1),
  };
};

export const endPlayerTurn = (
  gameId: string,
  playerId: string,
  gameState: GameState,
) =>
  updateGameState(gameId, {
    ...getNextTurnUpdateData(gameState),
    [`players/${playerId}/action`]: "endTurn",
  });

export const isPlayerAtPlace = (playerState: PlayerState) => {
  const place = ALL_PLACES[playerState.place!];
  return (
    place?.coordinates.lat === playerState.coordinates?.lat &&
    place?.coordinates.lng === playerState.coordinates?.lng
  );
};
