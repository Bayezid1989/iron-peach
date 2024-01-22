"use server";

import { ID_LENGTH } from "@/constants/db";
import { db } from "@/db";
import { gameTable, playerTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/firebase-admin/auth";
import {
  deleteDocAdmin,
  setOrMergeDocAdmin,
} from "@/lib/firebase-admin/firestore";
import { FirestoreGame } from "@/types/firestore";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function createNewGame(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      message: "Login first!",
    };
  }

  const rawFormData = {
    bots: formData.get("bots"),
    year: formData.get("year"),
  };

  const id = nanoid(ID_LENGTH.nano);

  const gameDoc: FirestoreGame = {
    year: 1,
    round: 1,
    turn: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const responses = await Promise.allSettled([
    db.transaction(async (tx) => {
      await tx.insert(gameTable).values({
        id,
        totalYears: Number(rawFormData.year),
        ownerId: user.uid,
        mapType: "world",
      });
      await tx.insert(playerTable).values({ userId: user.uid, gameId: id });
    }),
    setOrMergeDocAdmin(["games", id], gameDoc),
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
      deleteDocAdmin(["games", id]),
    ]);
    throw new Error("Failed to create game.");
  } else {
    redirect(`/game/${id}`);
  }
}
