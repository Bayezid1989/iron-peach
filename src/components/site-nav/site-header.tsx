import { Suspense } from "react";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { Skeleton } from "@/components/ui/skeleton";

export function SiteHeader() {
  return (
    <header className="container supports-backdrop-blur:bg-background/60 sticky top-0 z-20 w-full bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between">
        <DesktopNav />
        <MobileNav />
        <nav className="flex items-center space-x-2">
          <ModeToggle />
          <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
            <UserNav />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
