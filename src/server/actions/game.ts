"use server";

import { START_PLACES } from "@/constants";
import { ID_LENGTH, PLACE_IDS } from "@/constants/db";
import { db } from "@/server/db";
import { gameTable, playerTable } from "@/server/db/schema";
import { getCurrentUser } from "@/server/firebase-admin/auth";
import { getDocRef } from "@/server/firebase-admin/realtimeDb";
import { GameState } from "@/types/firebase";
import { pickRandom } from "@/utils";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { z } from "zod";

const gameSchema = z.object({
  bots: z.number(),
  year: z.number(),
  startPlace: z.enum([...PLACE_IDS, "random"]),
});

export async function createNewGame(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      message: "Login first!",
    };
  }

  const validatedFormData = gameSchema.parse({
    bots: Number(formData.get("bots")),
    year: Number(formData.get("year")),
    startPlace: formData.get("startPlace"),
  });

  const id = nanoid(ID_LENGTH.nano);

  const actualStartPlace =
    validatedFormData.startPlace === "random"
      ? pickRandom(START_PLACES)
      : validatedFormData.startPlace;

  const gameDoc: GameState = {
    year: 1,
    round: 1,
    turn: 1,
    order: [user.uid],
    state: "beforeGame",
    players: {
      [user.uid]: {
        place: actualStartPlace,
        balance: 1000,
        assets: {},
      },
    },
  };

  const responses = await Promise.allSettled([
    db.transaction(async (tx) => {
      await tx.insert(gameTable).values({
        id,
        totalYears: validatedFormData.year,
        ownerId: user.uid,
        mapType: "world",
        startPlace: validatedFormData.startPlace,
      });
      await tx.insert(playerTable).values({ userId: user.uid, gameId: id });
    }),
    getDocRef("games", id).set(gameDoc),
  ]);

  const rejected = responses.filter((r) => r.status === "rejected");
  if (rejected.length > 0) {
    console.log("rejected", rejected);
    // Delete all created docs
    await Promise.allSettled([
      db.transaction(async (tx) => {
        await tx.delete(gameTable).where(eq(gameTable.id, id));
        await tx.delete(playerTable).where(eq(playerTable.gameId, id));
      }),
      getDocRef("games", id).remove(),
    ]);
    throw new Error("Failed to create game.");
  } else {
    redirect(`/game/${id}`);
  }
}
