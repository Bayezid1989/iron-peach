import "server-only";

import { cookies } from "next/headers";

import { SessionCookieOptions } from "firebase-admin/auth";
import { adminAuth } from "./init";

export async function isAuthenticated(session: string | undefined = undefined) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = !(await adminAuth.verifySessionCookie(_session, true));
    return !isRevoked;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!(await isAuthenticated(session))) {
    return null;
  }

  const decodedIdToken = await adminAuth.verifySessionCookie(session!);
  const currentUser = await adminAuth.getUser(decodedIdToken.uid);

  return currentUser;
}

async function getSession() {
  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions,
) {
  return adminAuth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await adminAuth.verifySessionCookie(session);

  return await adminAuth.revokeRefreshTokens(decodedIdToken.sub);
}
