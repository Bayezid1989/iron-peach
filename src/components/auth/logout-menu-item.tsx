"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { callLogout } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutMenuItem() {
  const { push } = useRouter();

  const logout = async () => {
    const isOk = await callLogout();
    if (isOk) {
      push("/login");
    }
  };

  return <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>;
}
