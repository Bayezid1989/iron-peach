import { SiteHeader } from "@/components/site-nav/site-header";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("HeaderLayout");
  return (
    <div className="flex flex-col w-full">
      <SiteHeader />
      <div className="container py-6">{children}</div>
    </div>
  );
}
