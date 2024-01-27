import { db } from "@/server/db";

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
