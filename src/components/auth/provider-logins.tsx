"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { DEVICE_WIDTH } from "@/constants";
import { auth, authProviders } from "@/lib/firebase/init";
import {
  callLoginApi,
  loginWithPopup,
  loginWithRedirect,
} from "@/lib/firebase/auth";
import { useCallback, useEffect } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useToast } from "../ui/use-toast";
import { FirebaseError } from "firebase/app";
import { getRedirectResult } from "firebase/auth";

export function ProviderLogins() {
  const { replace, push } = useRouter();
  const [innerWidth] = useWindowSize();
  const { toast } = useToast();
  const pathname = usePathname();
  const params = useSearchParams();
  const redirect = params.get("redirect");

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof FirebaseError) {
        toast({ title: error?.code, description: error.message });
      } else {
        toast({
          title: "Unexpected Error",
          description: JSON.stringify(error),
        });
      }
    },
    [toast],
  );

  const handleProviderLogin = async (provider: keyof typeof authProviders) => {
    const isMobile = innerWidth < DEVICE_WIDTH.sm;

    try {
      if (isMobile) {
        replace(pathname + `?redirect=${provider}`);
        loginWithRedirect(provider);
      } else {
        const userCreds = await loginWithPopup(provider);
        const isOk = await callLoginApi(userCreds);
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
          const result = await getRedirectResult(auth);
          if (result?.user) {
            callLoginApi(result).then((isOk) => {
              if (isOk) push("/lobby");
            });
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
