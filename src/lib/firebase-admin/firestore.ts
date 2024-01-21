import "server-only";

import {
  CollectionReference,
  DocumentReference,
  type DocumentData,
  type PartialWithFieldValue,
} from "firebase-admin/firestore";
import { QueryPaths } from "@/types/firestore";
import { adminFirestore } from "./init";

type DocOrCollectionRef = DocumentReference | CollectionReference;

const getRef = (paths: string[]): DocOrCollectionRef => {
  let ref: DocOrCollectionRef = adminFirestore.collection(paths[0]);
  for (let i = 1; i < paths.length; i += 1) {
    ref =
      ref instanceof DocumentReference
        ? ref.collection(paths[i])
        : ref.doc(paths[i]);
  }
  return ref;
};

export const setOrMergeDoc = async (
  paths: QueryPaths,
  data: PartialWithFieldValue<DocumentData>,
): Promise<string> => {
  let ref = getRef(paths);
  if (ref instanceof CollectionReference) ref = ref.doc();

  await ref.set(data, { merge: true });
  return ref.id;
};
