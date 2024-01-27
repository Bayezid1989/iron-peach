"use server";

import { cookies } from "next/headers";
import { createSessionCookie, revokeAllSessions } from "../firebase-admin/auth";
import { HandledError } from "@/utils";
import { revalidatePath } from "next/cache";

export const setSessionCookie = async (idToken: string) => {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  const sessionCookie = await createSessionCookie(idToken, { expiresIn });

  console.log("Cookie set");
  cookies().set("__session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });
  revalidatePath("/");
  return true;
};

export const removeSessionCookie = async () => {
  const sessionCookie = cookies().get("__session")?.value;

  if (!sessionCookie) {
    throw new HandledError("sessionNotFound");
  }

  cookies().delete("__session");

  await revokeAllSessions(sessionCookie);
  revalidatePath("/");
  return true;
};
