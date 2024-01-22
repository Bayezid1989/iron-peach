"use client";

import { cn } from "@/lib/shadcn-utils";
import { Button } from "../ui/button";
import { LOBBY_ITEMS } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn("w-64", className)}>
      <div className="space-y-4 py-6">
        {LOBBY_ITEMS.map((item) => (
          <div key={item.id} className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {item.title}
            </h2>
            <div className="space-y-1 pl-2">
              {item.children.map((child) => (
                <Button
                  key={child.title}
                  variant={pathname === child.href ? "secondary" : "ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link className="text-left" href={child.href}>
                    {child.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
