import useSWR from "swr";
import { InferRequestType } from "hono";
import { honoClient } from "@/lib/hono";
import useGameState from "./use-game-state";

const fetcher =
  (arg: InferRequestType<typeof honoClient.api.shortestPath.$get>) =>
  async () => {
    const res = await honoClient.api.shortestPath.$get(arg);
    return await res.json();
  };

export default function useShortestPath() {
  const { gameState, turnPlayerState } = useGameState();

  const { data } = useSWR(
    turnPlayerState && gameState?.goal !== turnPlayerState.place
      ? ["shortestPath", gameState?.goal, turnPlayerState.place]
      : null,
    fetcher({
      query: {
        goal: gameState?.goal!,
        currentPlace: turnPlayerState?.place!,
      },
    }),
  );

  const returnData: typeof data =
    gameState?.goal === turnPlayerState?.place ? { stops: [], count: 0 } : data;

  return returnData;
}
