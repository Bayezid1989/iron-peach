import "server-only";

import { cert, getApps } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getDatabase } from "firebase-admin/database";
import { getMessaging } from "firebase-admin/messaging";
import { decryptAes128Cbc } from "../crypto";
import {
  FIREBASE_CONFIG,
  SERVICE_ACCOUNT_ENCRYPTED,
} from "@/constants/firebase";

if (!getApps().length) {
  const prdOrDev =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "prd" : "dev";

  const decrypt = decryptAes128Cbc(
    SERVICE_ACCOUNT_ENCRYPTED[prdOrDev],
    process.env.SERVICE_ACCOUNT_ENCRYPTION_KEY!,
    process.env.SERVICE_ACCOUNT_ENCRYPTION_IV!,
  );
  const config = FIREBASE_CONFIG[prdOrDev];

  admin.initializeApp({
    credential: cert(JSON.parse(decrypt)),
    storageBucket: config.storageBucket,
    databaseURL: config.databaseURL,
  });
}

export const adminFirestore = getFirestore();
export const adminAuth = getAuth();
export const adminBucket = getStorage().bucket();
export const adminRealtimeDB = getDatabase();
export const adminMessaging = getMessaging();
