import {
  UserCredential,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

import { APIResponse } from "@/types";
import { auth, authProviders } from "./init";

export const loginWithPopup = async (provider: keyof typeof authProviders) =>
  signInWithPopup(auth, authProviders[provider]);

export const loginWithRedirect = async (provider: keyof typeof authProviders) =>
  signInWithRedirect(auth, authProviders[provider]);

export const callLoginApi = async (userCreds: UserCredential) => {
  const idToken = await userCreds.user.getIdToken();
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });
  const resBody = (await response.json()) as unknown as APIResponse<string>;
  return response.ok && resBody.success;
};

export async function callLogout() {
  try {
    await auth.signOut();

    const response = await fetch("/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    return response.ok && resBody.success;
  } catch (error) {
    console.error("Error signing out with Google", error);
    return false;
  }
}
