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

type Props = {
  uid: string;
  game: Awaited<ReturnType<typeof getGame>>;
  gameId: string;
};

export default function GameBody({ uid, game, gameId }: Props) {
  const { data: gameState, error } = useSWRSubscription(
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
  console.log("Listen data", gameState);
  console.log("Listen error", error);

  // TODO: Add goal set roulette
  // TODO: add game buttons

  if (!game || !gameState) return null;
  const player = game.players.find((player) => player.user.id === uid);

  return (
    <main className="w-screen h-screen relative">
      <Map gameState={gameState} players={game.players} />
      <Card className="absolute top-3 left-3">
        <CardHeader>
          <CardTitle>{getGameTimeText(1, 1, game.totalYears)}</CardTitle>
          <CardDescription>
            Current Goal:
            <strong>
              {PLACE_NAME_DICTIONARY[gameState.goal!]?.en || "Johannesburg"}
            </strong>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card
        className="absolute top-3 right-3 hidden lg:block"
        // <!-- TODO: Add other players-->
      >
        <div className="p-4 bg-initial space-y-2">
          <div className="flex space-x-3 items-center">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={player?.user.imageUrl || "/avatars/01.png"}
                alt={player?.user.username || "user"}
                className="object-cover"
              />
              <AvatarFallback>⚠️</AvatarFallback>
            </Avatar>

            <div>
              <h4 className="text-xl font-bold">{player?.user.username}</h4>
            </div>
          </div>
          <div className="flex space-x-4">
            <small>
              <strong>
                {convertPrice(gameState.players[player?.user.id!].balance)}
              </strong>
            </small>
            <small>
              <strong>24</strong> steps to the goal
            </small>
          </div>
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

      <GameButtons />
    </main>
  );
}
