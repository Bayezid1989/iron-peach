"use client";

import Link from "next/link";
import { cn } from "@/lib/shadcn-utils";
import { NAV_ITEMS } from "@/constants/navigation";
import { CompanyLogo } from "@/components/company-logo";
import { usePathname } from "next/navigation";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link href="/" className="flex items-center space-x-2">
        <CompanyLogo className="h-8 w-8" />
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.split("/")[1] === item.href.split("/")[1]
                ? "text-foreground font-semibold"
                : "text-foreground/60",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
