"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { convertPrice } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getGame } from "@/server/queries/game";
import useShortestPath from "@/hooks/use-shortest-path";
import useGameState from "@/hooks/use-game-state";

export default function PlayerCard({
  player,
}: {
  player: NonNullable<Awaited<ReturnType<typeof getGame>>>["players"][number];
}) {
  const { gameState } = useGameState();
  const data = useShortestPath();

  return (
    <>
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
              {convertPrice(gameState?.players[player?.user.id!].balance || 0)}
            </strong>
            <strong>{data?.count}</strong> steps to the goal
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
    </>
  );
}
