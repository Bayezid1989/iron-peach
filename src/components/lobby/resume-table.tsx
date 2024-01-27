import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTime } from "@/lib/dayjs";
import { getSingleplayerGames } from "@/server/queries/game";
import { getGameTimeText } from "@/utils";
import Link from "next/link";
import { Button } from "../ui/button";

export const RESUME_TABLE_LIMIT = 7;

export default async function ResumeTable({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) {
  const games = await getSingleplayerGames(userId, RESUME_TABLE_LIMIT, page);

  return (
    <div className="rounded-lg border overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Last Updated</TableHead>
            <TableHead>Play vs</TableHead>
            <TableHead>Resume at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => {
            const lastUpdatedAt = formatTime(game.updatedAt);
            // Add bots count text

            return (
              <TableRow key={game.id} className="h-16">
                <TableCell className="w-40">{lastUpdatedAt}</TableCell>
                <TableCell className="w-40">No bots</TableCell>
                <TableCell className="flex-grow">
                  {getGameTimeText(1, 1, game.totalYears)}
                </TableCell>
                <TableCell className="w-28">
                  <Button size="sm" asChild>
                    <Link href={`/game/${game.id}`}>Resume</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
