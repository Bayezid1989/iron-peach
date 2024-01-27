import { db } from "@/db";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/server/firebase-admin/auth";
import GameBody from "@/components/game/game-body";

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
      players: {
        columns: { order: true },
        with: {
          user: { columns: { id: true, username: true, imageUrl: true } },
        },
      },
    },
    columns: {
      totalYears: true,
      mapType: true,
    },
  });

  console.log("game", game);

  if (!game) {
    notFound();
  }

  return <GameBody uid={currentUser.uid} game={game} />;
}
