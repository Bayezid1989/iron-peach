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
import { updateGameState } from "@/lib/firebase/realtimeDb";
import { increment } from "firebase/database";

export default function AssetBuySheet({ gameId }: { gameId: string }) {
  const { gameState, turnPlayerId, turnPlayerState } = useGameState();
  if (!gameState || !turnPlayerId || !turnPlayerState) return null;

  const assets = turnPlayerState.place
    ? ASSET_PLACES[turnPlayerState?.place]?.assets || []
    : [];

  return (
    <Sheet
      open={
        turnPlayerState.action === "move" &&
        turnPlayerState.place! in ASSET_PLACES
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
                updateGameState(gameId, {
                  turn:
                    gameState.turn < gameState.order.length - 1
                      ? gameState.turn + 1
                      : 0,
                  round: gameState.round < 12 ? increment(1) : 1,
                  year: gameState.round < 12 ? gameState.year : increment(1),
                  [`players/${turnPlayerId}/action`]: "endTurn",
                });
              }}
            >
              End Turn
            </Button>
            <Button>Buy</Button>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => {
                  const title =
                    ASSET_NAME_DICTIONARY[
                      asset.id as keyof typeof ASSET_NAME_DICTIONARY
                    ]?.en;

                  return (
                    <TableRow key={asset.id} className="text-sm">
                      <TableCell>{title}</TableCell>
                      <TableCell>{convertPrice(asset.price)}</TableCell>
                      <TableCell>{convetToPercent(asset.profitRate)}</TableCell>
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
