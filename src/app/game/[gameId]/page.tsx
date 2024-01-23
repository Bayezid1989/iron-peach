import { db } from "@/db";
import { notFound, redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGameTimeText } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/firebase-admin/auth";

type Props = {
  params: { gameId: string };
};

export default async function Game({ params }: Props) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }
  const { gameId } = params;
  const game = await db.query.gameTable.findFirst({
    where: (gameTable, { eq }) => eq(gameTable.id, gameId),
    with: {
      players: true,
    },
  });

  if (!game) {
    notFound();
  }

  return (
    <main className="w-full h-full relative">
      <Card className="absolute top-3 left-3">
        <CardHeader>
          <CardTitle>{getGameTimeText(1, 1, game.totalYears)}</CardTitle>
          <CardDescription>
            <p>
              Current Goal: <strong>Johannesburg</strong>
            </p>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card
        className="absolute top-3 right-3"
        // <!-- TODO: Add other players-->
      >
        <div className="hidden lg:block card p-4 bg-initial space-y-2">
          <div className="flex space-x-3 items-center">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={currentUser.photoURL || "/avatars/01.png"}
                alt={currentUser.displayName || "user"}
                className="object-cover"
              />
              <AvatarFallback>⚠️</AvatarFallback>
            </Avatar>

            <div>
              <h4 className="text-xl font-bold">{currentUser.displayName}</h4>
            </div>
          </div>
          <div className="flex space-x-4">
            <small>
              <strong>10,000</strong> dollars
            </small>
            <small>
              <strong>24</strong> steps to the goal
            </small>
          </div>
        </div>
        <div className="lg:hidden">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={currentUser.photoURL || "/avatars/01.png"}
              alt={currentUser.displayName || "user"}
              className="object-cover"
            />
            <AvatarFallback>⚠️</AvatarFallback>
          </Avatar>
        </div>
      </Card>
    </main>
  );
}
