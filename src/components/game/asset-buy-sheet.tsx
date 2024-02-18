import useGameState from "@/hooks/use-game-state";
import {
  ASSET_NAME_DICTIONARY,
  PLACE_NAME_DICTIONARY,
} from "@/constants/dictionary/map";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertPrice, convetToPercent } from "@/utils";
import { ASSET_PLACES } from "@/constants/placeList";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  updateGameState,
  endPlayerTurn,
  isPlayerAtPlace,
} from "@/lib/firebase/realtimeDb";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/shadcn-utils";
import { toast } from "@/components/ui/use-toast";
import { getGame } from "@/server/queries/game";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AssetBuySheet({
  gameId,
  players,
}: {
  gameId: string;
  players: NonNullable<Awaited<ReturnType<typeof getGame>>>["players"];
}) {
  const { gameState, turnPlayerId, turnPlayerState } = useGameState();
  const assetPlace = ASSET_PLACES[turnPlayerState?.place!];
  const [checks, setChecks] = useState<boolean[]>(
    assetPlace?.assets.map(() => false) || [],
  );
  if (!gameState || !turnPlayerState || !turnPlayerId || !assetPlace) {
    return null;
  }

  const buyAssets = async () => {
    const assets = assetPlace.assets.filter((_, index) => checks[index]);
    const total = assets.reduce((acc, asset) => acc + asset.price, 0);

    if (turnPlayerState.balance < total) {
      toast({ title: "You don't have enough money to buy these assets." });
      return;
    }

    await updateGameState(gameId, {
      [`players/${turnPlayerId}/balance`]: turnPlayerState.balance - total,
      [`players/${turnPlayerId}/assets`]: {
        ...(turnPlayerState.assets || {}),
        ...Object.fromEntries(assets.map((asset) => [asset.id, 1])),
      },
      [`players/${turnPlayerId}/action`]: "buyAsset",
    });
    setChecks((prev) => prev.map(() => false));
    endPlayerTurn(gameId, turnPlayerId, gameState);
  };

  return (
    <Sheet
      open={
        turnPlayerState.action === "move" && isPlayerAtPlace(turnPlayerState)
      }
    >
      <SheetContent side="bottom" hideX>
        <SheetHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
          <div>
            <SheetTitle>
              {PLACE_NAME_DICTIONARY[turnPlayerState.place!]?.en}
            </SheetTitle>
            <SheetDescription>Do you want to buy assets?</SheetDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => {
                setChecks((prev) => prev.map(() => false));
                endPlayerTurn(gameId, turnPlayerId, gameState);
              }}
            >
              End Turn
            </Button>
            <Button onClick={buyAssets}>Buy</Button>
          </div>
        </SheetHeader>
        <div className="p-4">
          <div className="overflow-y-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>{`Profit (%)`}</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {assetPlace.assets.map((asset, index) => {
                  const title =
                    ASSET_NAME_DICTIONARY[
                      asset.id as keyof typeof ASSET_NAME_DICTIONARY
                    ]?.en;

                  const ownerId = Object.entries(gameState.players).find(
                    ([_, playerState]) => playerState.assets?.[asset.id],
                  )?.[0];
                  const owner = players.find(
                    (player) => player.user.id === ownerId,
                  );

                  return (
                    <TableRow
                      key={asset.id}
                      className={cn(
                        "text-sm",
                        checks[index] && "bg-muted hover:bg-muted",
                      )}
                    >
                      <TableCell>{title}</TableCell>
                      <TableCell>{convertPrice(asset.price)}</TableCell>
                      <TableCell>{convetToPercent(asset.profitRate)}</TableCell>
                      <TableHead>
                        {owner && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={owner.user.imageUrl || "/avatars/01.png"}
                              alt={owner.user.username || "user"}
                              className="object-cover"
                            />
                            <AvatarFallback>⚠️</AvatarFallback>
                          </Avatar>
                        )}
                      </TableHead>
                      <TableCell>
                        <Checkbox
                          checked={checks[index]}
                          disabled={!!owner}
                          onClick={() =>
                            setChecks((prev) => {
                              const next = [...prev];
                              next[index] = !prev[index];
                              return next;
                            })
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
