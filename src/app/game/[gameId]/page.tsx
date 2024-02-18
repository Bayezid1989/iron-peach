import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/server/firebase-admin/auth";
import GameBody from "@/components/game/game-body";
import { getGame } from "@/server/queries/game";

type Props = {
  params: { gameId: string };
};

export default async function GamePage({ params }: Props) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }
  const { gameId } = params;
  const game = await getGame(gameId);

  if (!game) {
    notFound();
  }

  return (
    <GameBody
      uid={currentUser.uid}
      isAdmin={currentUser.customClaims?.isAdmin}
      game={game}
      gameId={gameId}
    />
  );
}
