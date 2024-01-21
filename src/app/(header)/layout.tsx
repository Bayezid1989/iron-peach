import { SiteHeader } from "@/components/site-nav/site-header";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <SiteHeader />
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
