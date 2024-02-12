"use client";

import { Dispatch, SetStateAction } from "react";
import { PLACE_NAME_DICTIONARY } from "@/constants/dictionary/map";
import { PlaceId } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { moveMarker } from "@/lib/turf";
import { updatePlayerState } from "@/lib/firebase/realtimeDb";
import { Button } from "@/components/ui/button";
import usePossiblePaths from "@/hooks/use-possible-paths";
import useGameState from "@/hooks/use-game-state";
import { useParams } from "next/navigation";

export default function MoveConfirmDialog({
  placeId,
  setPlaceId,
}: {
  placeId: PlaceId | null;
  setPlaceId: Dispatch<SetStateAction<PlaceId | null>>;
}) {
  const params = useParams();
  const gameId = params.gameId as string;
  const { turnPlayerId } = useGameState();
  const possiblePaths = usePossiblePaths();

  const onClick = () => {
    setPlaceId(null);
    const path = possiblePaths.find((p) => p[p.length - 1] === placeId);
    moveMarker(path!, (coordinates) =>
      updatePlayerState(gameId, turnPlayerId!, { coordinates }),
    );
    updatePlayerState(gameId, turnPlayerId!, {
      action: "move",
      place: placeId!,
      diceResult: null,
    });
  };

  return (
    <Dialog
      open={!!placeId}
      onOpenChange={(open) => {
        if (!open) setPlaceId(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Do you want to go to ${
            PLACE_NAME_DICTIONARY[placeId!]?.en
          }?`}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={onClick}>
            Move
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
