import "server-only";

import { FirebaseCollection } from "@/types/firebase";
import { adminRealtimeDB } from "./init";

export const getDocRef = (collectionName: FirebaseCollection, id: string) =>
  adminRealtimeDB.ref(collectionName).child(id);
