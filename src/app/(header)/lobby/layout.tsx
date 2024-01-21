import { Sidebar } from "@/components/lobby/side-bar";
import { LOBBY_ITEMS } from "@/constants/navigation";
import React from "react";

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar items={LOBBY_ITEMS} className="hidden lg:block" />
      <div className="p-6">{children}</div>
    </div>
  );
}
