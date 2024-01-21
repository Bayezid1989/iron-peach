import type { FieldValue, Timestamp } from "firebase-admin/firestore";

export type FirestoreCollection = "games";
export type QueryPaths = [collection: FirestoreCollection, ...paths: string[]];

export type Timestamps = Date | Timestamp | FieldValue;

export interface FirestoreGame {
  year: number;
  round: number;
  turn: number;
  currentGoal?: string;
  updatedAt: Timestamps;
  createdAt: Timestamps;
}
