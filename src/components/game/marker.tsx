"use client";

import { createMarkerImage } from "@/lib/canvas";
import { Coordinates } from "@/types";
import { useEffect, useState } from "react";
import { Marker as MarkerGl } from "react-map-gl";

export default function Marker({
  playerId,
  coordinates,
  playerImageUrl,
}: {
  playerId: string;
  coordinates?: Coordinates;
  playerImageUrl: string | null;
}) {
  const [image, setImage] = useState<string>("/markers/player-white.png");

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
