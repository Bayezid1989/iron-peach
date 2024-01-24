import { auth } from "firebase-functions/v1";
import { HttpsError } from "firebase-functions/v2/identity";
import { log } from "firebase-functions/logger";
import { db } from "./db";
import { userTable } from "./db/schema";

export const onAuthCreate = auth.user().onCreate(async (user) => {
  const { uid, displayName, photoURL, providerData, email } = user;
  log("Creating new user", uid, displayName, photoURL, email, providerData);

  if (!email) {
    throw new HttpsError("permission-denied", "Email is required");
  }

  await db.insert(userTable).values({
    id: uid,
    username: displayName || email.split("@")[0],
    imageUrl: photoURL,
    email,
  });
});
