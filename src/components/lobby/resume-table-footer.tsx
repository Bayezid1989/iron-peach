import { count, eq } from "drizzle-orm";
import ResumeTablePagination from "./resume-table-pagination";
import { db } from "@/server/db";
import { gameTable } from "@/server/db/schema";
import { RESUME_TABLE_LIMIT } from "./resume-table";

export default async function ResumeTableFooter({
  page,
  userId,
}: {
  page: number;
  userId: string;
}) {
  const data = await db
    .select({ value: count(gameTable.id) })
    .from(gameTable)
    .where(eq(gameTable.ownerId, userId));

  const totalPages = Math.ceil(data[0].value / RESUME_TABLE_LIMIT);

  return (
    <div className="flex w-full justify-end">
      <ResumeTablePagination totalPages={totalPages} page={page} />
    </div>
  );
}
