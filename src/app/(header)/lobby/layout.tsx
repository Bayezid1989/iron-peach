import { Sidebar } from "@/components/lobby/side-bar";

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar className="hidden lg:block" />
      <div className="w-full">{children}</div>
    </div>
  );
}
