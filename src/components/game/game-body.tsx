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
import AssetSheet from "./asset-sheet";
import MoveConfirmDialog from "./move-confirm-dialog";
import type { PlaceId } from "@/types";
import { useState } from "react";
import useMoveIncomeExpense from "@/hooks/use-move-income-expense";

type Props = {
  uid: string;
  isAdmin: boolean;
  game: Awaited<ReturnType<typeof getGame>>;
  gameId: string;
};

export default function GameBody({ uid, isAdmin, game, gameId }: Props) {
  const { gameState, turnPlayerId, turnPlayerState } = useGameState();
  const [assetPlaceId, setAssetPlaceId] = useState<PlaceId | null>(null);
  const [moveToPlaceId, setMoveToPlaceId] = useState<PlaceId | null>(null);
  useMoveIncomeExpense(gameId, uid);

  console.log("Game state data", gameState);

  // TODO: Add goal set roulette

  if (!game || !gameState || !turnPlayerId) return null;
  const player = game.players.find((player) => player.user.id === turnPlayerId);

  return (
    <main className="relative h-screen w-screen">
      <Map
        isAdmin={isAdmin}
        players={game.players}
        setAssetPlaceId={setAssetPlaceId}
        setMoveToPlaceId={setMoveToPlaceId}
      />
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

      {uid === turnPlayerId && (
        <>
          <GameButtons />
          <MoveConfirmDialog
            placeId={moveToPlaceId}
            setPlaceId={setMoveToPlaceId}
          />
          <AssetBuySheet gameId={gameId} players={game.players} />
        </>
      )}
      {!!turnPlayerState?.diceResult && (
        <Dice diceResult={turnPlayerState.diceResult} />
      )}
      {isAdmin && (
        <AssetSheet placeId={assetPlaceId} setPlaceId={setAssetPlaceId} />
      )}
    </main>
  );
}
