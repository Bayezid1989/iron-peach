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

export default function MoveConfirmDialog({
  placeId,
  setPlaceId,
  possiblePaths,
  gameId,
  turnPlayerId,
}: {
  placeId: PlaceId | null;
  setPlaceId: Dispatch<SetStateAction<PlaceId | null>>;
  gameId: string;
  turnPlayerId: string;
  possiblePaths: PlaceId[][] | undefined;
}) {
  const onClick = () => {
    setPlaceId(null);
    const path = possiblePaths?.find((p) => p[p.length - 1] === placeId);
    moveMarker(path!, (coordinates) =>
      updatePlayerState(gameId, turnPlayerId, { coordinates }),
    );
    updatePlayerState(gameId, turnPlayerId, {
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
