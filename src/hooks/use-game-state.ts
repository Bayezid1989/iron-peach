import useSWRSubscription, { SWRSubscriptionOptions } from "swr/subscription";

import { realtimeDb } from "@/lib/firebase/init";
import { off, onValue, ref } from "firebase/database";
import { GameState } from "@/types/firebase";
import { useParams } from "next/navigation";

export default function useGameState() {
  const params = useParams();

  const { data } = useSWRSubscription(
    typeof params.gameId === "string" ? ["game", params.gameId] : null,
    ([_, id], { next }: SWRSubscriptionOptions<GameState, Error>) => {
      const gameRef = ref(realtimeDb, `games/${id}`);
      onValue(
        gameRef,
        (snapshot) => next(null, snapshot.val()),
        (err) => next(err),
      );

      return () => off(gameRef);
    },
  );
  const turnPlayerId = data?.order[data?.turn];
  const turnPlayerState = data?.players[turnPlayerId!];

  return { gameState: data, turnPlayerId, turnPlayerState };
}
