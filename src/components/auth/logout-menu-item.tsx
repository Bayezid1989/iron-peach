"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useErrorToast from "@/hooks/useErrorToast";
import { auth } from "@/lib/firebase/init";
import { removeSessionCookie } from "@/server/actions/auth";
import { useRouter } from "next/navigation";

export function LogoutMenuItem() {
  const { push } = useRouter();
  const { handleError } = useErrorToast();

  const logout = async () => {
    try {
      await auth.signOut();

      const isOk = await removeSessionCookie();
      if (isOk) {
        push("/login");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>;
}
