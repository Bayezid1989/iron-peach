import useGameState from "./use-game-state";
import { useEffect } from "react";
import { INCOME_EXPENSE_PLACES } from "@/constants/placeList";
import {
  updatePlayerState,
  endPlayerTurn,
  isPlayerAtPlace,
} from "@/lib/firebase/realtimeDb";
import { getRandomCash } from "@/utils";

export default function useMoveIncomeExpense(gameId: string, uid: string) {
  const { gameState, turnPlayerId, turnPlayerState } = useGameState();

  useEffect(() => {
    if (
      turnPlayerId === uid &&
      turnPlayerState?.action === "move" &&
      turnPlayerState?.place &&
      turnPlayerState.place in INCOME_EXPENSE_PLACES &&
      isPlayerAtPlace(turnPlayerState)
    ) {
      const place = INCOME_EXPENSE_PLACES[turnPlayerState.place];
      const cash = getRandomCash(place?.cashVolume!);
      updatePlayerState(gameId, turnPlayerId, {
        balance:
          turnPlayerState.balance + (place?.role === "income" ? cash : -cash),
        action: place?.role === "income" ? "getCash" : "loseCash",
      }).then(() => endPlayerTurn(gameId, turnPlayerId, gameState!));
    }
  }, [gameId, gameState, turnPlayerId, turnPlayerState, uid]);
}
