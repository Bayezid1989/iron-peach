"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { DEVICE_WIDTH } from "@/constants";
import { auth, authProviders } from "@/lib/firebase/init";
import { loginWithPopup, loginWithRedirect } from "@/lib/firebase/auth";
import { useEffect } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useToast } from "@/components/ui/use-toast";
import { getRedirectResult } from "firebase/auth";
import { setSessionCookie } from "@/server/actions/auth";
import useErrorToast from "@/hooks/useErrorToast";

export function ProviderLogins() {
  const { replace, push } = useRouter();
  const [innerWidth] = useWindowSize();
  const pathname = usePathname();
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const { handleError } = useErrorToast();

  const handleProviderLogin = async (provider: keyof typeof authProviders) => {
    const isMobile = innerWidth < DEVICE_WIDTH.sm;

    try {
      if (isMobile) {
        replace(pathname + `?redirect=${provider}`);
        loginWithRedirect(provider);
      } else {
        const userCreds = await loginWithPopup(provider);
        const idToken = await userCreds.user.getIdToken();
        const isOk = await setSessionCookie(idToken);
        if (isOk) {
          push("/lobby");
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (redirect === "google" || redirect === "twitter") {
      const handleRedirectResult = async () => {
        try {
          const userCreds = await getRedirectResult(auth);
          if (userCreds?.user) {
            const idToken = await userCreds.user.getIdToken();
            const isOk = await setSessionCookie(idToken);
            if (isOk) {
              push("/lobby");
            }
          }
        } catch (error) {
          handleError(error);
        }
      };

      handleRedirectResult();
    }
  }, [params, push, redirect, handleError]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <Button variant="outline" onClick={() => handleProviderLogin("google")}>
        <Icons.coloredGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" disabled>
        <Icons.apple className="mr-2 h-4 w-4" />
        Apple
      </Button>
    </div>
  );
}
