"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { convertPrice } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getGame } from "@/server/queries/game";
import useShortestPath from "@/hooks/use-shortest-path";
import useGameState from "@/hooks/use-game-state";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export default function PlayerCard({
  player,
}: {
  player: NonNullable<Awaited<ReturnType<typeof getGame>>>["players"][number];
}) {
  const { gameState } = useGameState();
  const data = useShortestPath();

  const playerState = gameState?.players[player?.user.id!];

  useEffect(() => {
    if (playerState?.action === "buyAsset") {
      toast({ title: `${player.user.username} bought assets.` }); // Add what assets bought by creating and fetching the asset name
    } else if (playerState?.action === "getCash") {
      toast({ title: `${player.user.username} got cash.` }); // Add how much cash get
    } else if (playerState?.action === "loseCash") {
      toast({ title: `${player.user.username} lost cash.` }); // Add how much cash get
    }
  }, [playerState, player.user.username]);

  return (
    <>
      <Card
        className="absolute right-3 top-3 hidden lg:block"
        // <!-- TODO: Add other players-->
      >
        <div className="bg-initial space-y-2 p-4">
          <div className="flex items-center space-x-3">
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
            <strong>{convertPrice(playerState?.balance || 0)}</strong>
            <strong>{data?.count}</strong> steps to the goal
            <strong>
              {Object.keys(playerState?.assets || {}).length}
            </strong>{" "}
            assets
          </CardDescription>
        </div>
      </Card>
      <div className="absolute right-3 top-3 lg:hidden">
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
