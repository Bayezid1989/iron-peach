"use server";

import { ID_LENGTH } from "@/constants/db";
import { db } from "@/db";
import { gameTable } from "@/db/schema";
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

  const gameDoc = {
    year: 1,
    round: 1,
    turn: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as FirestoreGame;

  const responses = await Promise.allSettled([
    db.insert(gameTable).values({
      id,
      totalYears: Number(rawFormData.year),
      ownerId: user.uid,
      mapType: "world",
    }),
    setOrMergeDocAdmin(["games", id], gameDoc),
  ]);
  const rejected = responses.filter((r) => r.status === "rejected");
  if (rejected.length > 0) {
    console.log("rejected", rejected);
    // Delete all created docs
    await Promise.all([
      db.delete(gameTable).where(eq(gameTable.id, id)),
      deleteDocAdmin(["games", id]),
    ]);
    throw new Error("Failed to create game.");
  } else {
    redirect(`/game/${id}`);
  }
}
