"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Dispatch, SetStateAction } from "react";
import { ASSET_PLACES } from "@/constants/placeList";
import {
  ASSET_NAME_DICTIONARY,
  PLACE_NAME_DICTIONARY,
} from "@/constants/dictionary/map";
import { cn } from "@/lib/shadcn-utils";
import { convertPrice, convetToPercent } from "@/utils";
import { PlaceId } from "@/types";

export default function AssetSheet({
  placeId,
  setPlaceId,
}: {
  placeId: PlaceId | null;
  setPlaceId: Dispatch<SetStateAction<PlaceId | null>>;
}) {
  const assets = placeId ? ASSET_PLACES[placeId]?.assets || [] : [];

  return (
    <Sheet
      open={!!placeId}
      onOpenChange={(open) => {
        if (!open) setPlaceId(null);
      }}
    >
      <SheetContent className="w-full space-y-6 p-4 sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{PLACE_NAME_DICTIONARY[placeId!]?.en}</SheetTitle>
          <SheetDescription>There are some you can afford.</SheetDescription>
        </SheetHeader>
        <div className={cn("overflow-y-auto rounded-lg border")}>
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
      </SheetContent>
    </Sheet>
  );
}
