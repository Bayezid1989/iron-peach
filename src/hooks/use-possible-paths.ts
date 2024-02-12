import useSWR from "swr";
import { InferRequestType } from "hono";
import { honoClient } from "@/lib/hono";
import useGameState from "./use-game-state";

const fetcher =
  (arg: InferRequestType<typeof honoClient.api.possiblePaths.$get>) =>
  async () => {
    const res = await honoClient.api.possiblePaths.$get(arg);
    return await res.json();
  };

export default function usePossiblePaths() {
  const { gameState, turnPlayerId, turnPlayerState } = useGameState();

  const { data } = useSWR(
    turnPlayerState?.action === "roll" && turnPlayerState.diceResult
      ? ["possiblePaths", turnPlayerState.diceResult]
      : null,
    fetcher({
      query: {
        currentPlace: gameState?.players[turnPlayerId || ""]?.place!,
        moveNumber: turnPlayerState?.diceResult?.toString() || "",
      },
    }),
  );

  return data?.paths || [];
}
