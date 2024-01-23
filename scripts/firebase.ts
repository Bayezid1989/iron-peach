import { type AppOptions, cert, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const serviceAccount = require("./service-account-dev.json");

const firebaseConfig: AppOptions = {
  credential: cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.appspot.com`,
  databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
};

initializeApp(firebaseConfig);

export const realtimeDb = getDatabase();
