"use client";

import { ALL_PLACES } from "@/constants/placeList";
import { createMarkerImage } from "@/lib/canvas";
import { GameState } from "@/types/firebase";
import { useEffect, useState } from "react";
import { Marker as MarkerGl } from "react-map-gl";

export default function Marker({
  playerId,
  player,
  playerImageUrl,
}: {
  playerId: string;
  player: GameState["players"][keyof GameState["players"]];
  playerImageUrl: string | null;
}) {
  const [image, setImage] = useState<string>(
    "/public/markers/player-white.png",
  );
  const coordinates = ALL_PLACES[player.place!]?.coordinates;

  useEffect(() => {
    if (playerImageUrl) {
      createMarkerImage(playerImageUrl).then((imageUrl) => setImage(imageUrl));
    }
  }, [playerImageUrl]);

  return (
    <MarkerGl
      key={playerId}
      longitude={coordinates?.lng!}
      latitude={coordinates?.lat!}
      anchor="bottom"
      style={{ width: "46px", height: "46px" }}
    >
      <img src={image} />
    </MarkerGl>
  );
}
