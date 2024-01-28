import { signInWithPopup, signInWithRedirect } from "firebase/auth";

import { auth, authProviders } from "./init";

export const loginWithPopup = async (provider: keyof typeof authProviders) =>
  signInWithPopup(auth, authProviders[provider]);

export const loginWithRedirect = async (provider: keyof typeof authProviders) =>
  signInWithRedirect(auth, authProviders[provider]);
