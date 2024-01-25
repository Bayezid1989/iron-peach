import { Sidebar } from "@/components/lobby/side-bar";

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-x-8">
      <Sidebar className="hidden lg:block" />
      <main className="w-full">{children}</main>
    </div>
  );
}
