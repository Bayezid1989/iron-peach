import { SiteHeader } from "@/components/site-nav/site-header";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col">
      <SiteHeader />
      {children}
    </div>
  );
}
