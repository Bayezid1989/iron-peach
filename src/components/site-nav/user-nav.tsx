import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/server/firebase-admin/auth";
import { LogoutMenuItem } from "@/components/auth/logout-menu-item";
import Link from "next/link";

export async function UserNav() {
  const currentUser = await getCurrentUser();
  console.log("currentUser uid", currentUser?.uid);

  // BUG: when logout --> lobby --> login, currentUser is null
  // Waiting for nextjs to fix this bug: https://github.com/vercel/next.js/discussions/54075#discussioncomment-6754339

  if (!currentUser) {
    return (
      <Button variant="outline">
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={currentUser.photoURL || "/avatars/01.png"}
              alt={currentUser.displayName || "user"}
              className="object-cover"
            />
            <AvatarFallback>⚠️</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
