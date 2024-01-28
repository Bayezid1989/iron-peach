import { db } from "@/server/db";

export const getGame = async (gameId: string) => {
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
    columns: { totalYears: true, mapType: true },
  });
  return game;
};

export const getSingleplayerGames = async (
  userId: string,
  limit: number,
  currentPage: number,
) => {
  return db.query.gameTable.findMany({
    where: (gameTable, { eq, and, isNull }) =>
      and(eq(gameTable.ownerId, userId), isNull(gameTable.deletedAt)),
    orderBy: (gameTable, { desc }) => [desc(gameTable.createdAt)],
    limit: limit,
    offset: (currentPage - 1) * limit,
  });
};
