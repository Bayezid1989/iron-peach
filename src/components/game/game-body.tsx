"use client";

import useSWRSubscription, { SWRSubscriptionOptions } from "swr/subscription";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertPrice, getGameTimeText } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Map from "./map";
import { getGame } from "@/server/queries/game";
import { realtimeDb } from "@/lib/firebase/init";
import { off, onValue, ref } from "firebase/database";
import { GameState } from "@/types/firebase";
import { PLACE_NAME_DICTIONARY } from "@/constants/dictionary/map";
import GameButtons from "./game-buttons";
import { honoClient } from "@/lib/hono";
import { InferRequestType } from "hono";
import useSWR from "swr";

type Props = {
  uid: string;
  game: Awaited<ReturnType<typeof getGame>>;
  gameId: string;
};

const shortestPathFetcher =
  (arg: InferRequestType<typeof honoClient.api.shortestPath.$get>) =>
  async () => {
    const res = await honoClient.api.shortestPath.$get(arg);
    return await res.json();
  };
const nthPlacesFetcher =
  (arg: InferRequestType<typeof honoClient.api.nthPlaces.$get>) => async () => {
    const res = await honoClient.api.nthPlaces.$get(arg);
    return await res.json();
  };

export default function GameBody({ game, gameId }: Props) {
  const { data: gameState } = useSWRSubscription(
    ["game", gameId],
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
  const turnPlayerId = gameState?.order[gameState?.turn];

  const { data: shortestPathData } = useSWR(
    turnPlayerId && [
      "shortestPath",
      gameState?.goal,
      gameState?.players[turnPlayerId].place,
    ],
    shortestPathFetcher({
      query: {
        goal: gameState?.goal!,
        currentPlace: gameState?.players[turnPlayerId || ""]?.place!,
      },
    }),
  );

  const turnPlayer = gameState?.players[turnPlayerId!];
  const { data: nthPlacesData } = useSWR(
    turnPlayer?.action === "roll" && turnPlayer.diceResult
      ? ["nthPlaces"]
      : undefined,
    nthPlacesFetcher({
      query: {
        currentPlace: gameState?.players[turnPlayerId || ""]?.place!,
        moveNumber: turnPlayer?.diceResult?.toString() || "",
      },
    }),
  );

  console.log("shortestPathData", shortestPathData?.count);
  console.log("nthPlacesData", nthPlacesData?.places);
  console.log("Game state data", gameState);

  // TODO: Add goal set roulette
  // TODO: add game buttons

  if (!game || !turnPlayerId) return null;
  const player = game.players.find((player) => player.user.id === turnPlayerId);

  return (
    <main className="w-screen h-screen relative">
      <Map gameState={gameState} players={game.players} />
      <Card className="absolute top-3 left-3">
        <CardHeader>
          <CardTitle>
            {getGameTimeText(gameState.year, gameState.round, game.totalYears)}
          </CardTitle>
          <CardDescription>
            Current Goal:
            <strong>{PLACE_NAME_DICTIONARY[gameState.goal!]?.en}</strong>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card
        className="absolute top-3 right-3 hidden lg:block"
        // <!-- TODO: Add other players-->
      >
        <div className="p-4 bg-initial space-y-2">
          <div className="flex space-x-3 items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={player?.user.imageUrl || "/avatars/01.png"}
                alt={player?.user.username || "user"}
                className="object-cover"
              />
              <AvatarFallback>⚠️</AvatarFallback>
            </Avatar>

            <CardTitle>{player?.user.username} </CardTitle>
          </div>
          <CardDescription className="space-x-6">
            <strong>
              {convertPrice(gameState.players[player?.user.id!].balance)}
            </strong>
            <strong>{shortestPathData?.count}</strong> steps to the goal
          </CardDescription>
        </div>
      </Card>
      <div className="lg:hidden absolute top-3 right-3">
        <Avatar className="h-12 w-12 rounded-full">
          <AvatarImage
            src={player?.user.imageUrl || "/avatars/01.png"}
            alt={player?.user.username || "user"}
            className="object-cover"
          />
          <AvatarFallback>⚠️</AvatarFallback>
        </Avatar>
      </div>

      <GameButtons gameId={gameId} playerId={turnPlayerId} />
    </main>
  );
}
