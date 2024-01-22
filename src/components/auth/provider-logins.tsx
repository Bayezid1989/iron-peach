"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { DEVICE_WIDTH } from "@/constants";
import { authProviders } from "@/lib/firebase/init";
import {
  callLoginApi,
  callLoginApiFromRedirect,
  loginWithPopup,
  loginWithRedirect,
} from "@/lib/firebase/auth";
import { useEffect } from "react";
import useWindowSize from "@/hooks/useWindowSize";

export function ProviderLogins() {
  const { replace, push } = useRouter();
  const [innerWidth] = useWindowSize();
  const pathname = usePathname();
  const params = useSearchParams();
  const redirect = params.get("redirect");

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
      console.error(error);
    }
  };

  useEffect(() => {
    if (redirect === "google" || redirect === "twitter") {
      const handleRedirectResult = async () => {
        const isOk = await callLoginApiFromRedirect();
        if (isOk) {
          push("/lobby");
        }
      };

      handleRedirectResult();
    }
  }, [params, push, redirect]);

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
