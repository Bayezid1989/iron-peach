"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGameTimeText } from "@/utils";
import Map from "./map";
import { getGame } from "@/server/queries/game";

import { PLACE_NAME_DICTIONARY } from "@/constants/dictionary/map";
import GameButtons from "./game-buttons";

import PlayerCard from "./player-card";
import Dice from "./dice";
import useGameState from "@/hooks/use-game-state";
import AssetBuySheet from "./asset-buy-sheet";
import { ASSET_PLACES } from "@/constants/placeList";

type Props = {
  uid: string;
  game: Awaited<ReturnType<typeof getGame>>;
  gameId: string;
};

export default function GameBody({ uid, game, gameId }: Props) {
  const { gameState, turnPlayerId, turnPlayerState } = useGameState();

  console.log("Game state data", gameState);

  // TODO: Add goal set roulette

  if (!game || !gameState || !turnPlayerId) return null;
  const player = game.players.find((player) => player.user.id === turnPlayerId);

  return (
    <main className="relative h-screen w-screen">
      <Map players={game.players} />
      <Card className="absolute left-3 top-3">
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

      {player && <PlayerCard player={player} />}

      {uid === turnPlayerId && <GameButtons />}
      {!!turnPlayerState?.diceResult && (
        <Dice diceResult={turnPlayerState.diceResult} />
      )}
      {turnPlayerState?.action === "move" &&
        turnPlayerState?.place! in ASSET_PLACES && (
          <AssetBuySheet gameId={gameId} />
        )}
    </main>
  );
}
