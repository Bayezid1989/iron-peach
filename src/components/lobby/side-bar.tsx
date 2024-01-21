import { cn } from "@/lib/shadcn-utils";
import { headers } from "next/headers";
import { Button } from "../ui/button";
import { LOBBY_ITEMS } from "@/constants/navigation";
import Link from "next/link";
import { getPathname } from "next-impl-getters/get-pathname"; // workaround

export function Sidebar({
  items,
  className,
}: {
  items: typeof LOBBY_ITEMS;
  className?: string;
}) {
  const pathname = getPathname();

  return (
    <div className={cn("w-64", className)}>
      <div className="space-y-4 py-6">
        {items.map((item) => (
          <div key={item.id} className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {item.title}
            </h2>
            <div className="space-y-1 pl-2">
              {item.children.map((child) => (
                <Button
                  key={child.title}
                  variant={pathname === child.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Link href={child.href}>{child.title}</Link>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
