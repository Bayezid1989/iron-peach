import { getApps, initializeApp } from "firebase/app";
// import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  useDeviceLanguage as setDeviceLanguage,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { FIREBASE_CONFIG } from "@/constants/firebase";

const firebaseConfig =
  FIREBASE_CONFIG[
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "prd" : "dev"
  ];
const apps = getApps();
const app = apps.length ? apps[0] : initializeApp(firebaseConfig);

const auth = getAuth(app);
setDeviceLanguage(auth);

const realtimeDb = getDatabase(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// TODO: Add Firebase Analytics and App Check

// const isClient = typeof window !== 'undefined';
// const analytics = isClient && getAnalytics(app);
// if (isClient) {
// 	initializeAppCheck(app, {
// 		provider: new ReCaptchaV3Provider('6LcNILQaAAAAAESEqIDDVaHlL4HZgJa2X-0wp0dz'),
// 		isTokenAutoRefreshEnabled: true
// 	});
// }

const authProviders = {
  google: new GoogleAuthProvider(),
  twitter: new TwitterAuthProvider(),
};
authProviders.google.setCustomParameters({ prompt: "select_account" });
authProviders;

export { storage, functions, realtimeDb, auth, authProviders };
