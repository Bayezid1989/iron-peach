"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGameTimeText } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { MapType } from "@/db/schema";
import Map from "./map";

type Props = {
  uid: string;
  game: {
    totalYears: number;
    mapType: MapType;
    players: {
      order: number | null;
      user: {
        id: string;
        username: string;
        imageUrl: string | null;
      };
    }[];
  };
};

export default function GameBody({ uid, game }: Props) {
  const player = game.players.find((player) => player.user.id === uid);
  return (
    <main className="w-screen h-screen relative">
      <Map />

      <Card className="absolute top-3 left-3">
        <CardHeader>
          <CardTitle>{getGameTimeText(1, 1, game.totalYears)}</CardTitle>
          <CardDescription>
            Current Goal: <strong>Johannesburg</strong>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card
        className="absolute top-3 right-3"
        // <!-- TODO: Add other players-->
      >
        <div className="hidden lg:block card p-4 bg-initial space-y-2">
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
              <strong>10,000</strong> dollars
            </small>
            <small>
              <strong>24</strong> steps to the goal
            </small>
          </div>
        </div>
        <div className="lg:hidden">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={player?.user.imageUrl || "/avatars/01.png"}
              alt={player?.user.username || "user"}
              className="object-cover"
            />
            <AvatarFallback>⚠️</AvatarFallback>
          </Avatar>
        </div>
      </Card>
    </main>
  );
}
