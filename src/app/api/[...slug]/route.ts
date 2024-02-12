import { Hono } from "hono";
import { handle } from "hono/vercel";
import { validator } from "hono/validator";
import { z } from "zod";
import { readNeo4j } from "@/server/neo4j";
import { PLACE_IDS } from "@/constants/db";
import { PlaceId } from "@/types";
import { RoutePath } from "@/types/neo4j";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const shortestPathSchema = z.object({
  goal: z.enum(PLACE_IDS),
  currentPlace: z.enum(PLACE_IDS),
});

const possiblePathSchema = z.object({
  moveNumber: z.string(),
  currentPlace: z.enum(PLACE_IDS),
});

const route = app
  .post("/hello", (c) => {
    return c.json({
      message: `Hello !`,
    });
  })
  .get(
    "/shortestPath",
    validator("query", (value, c) => {
      const parsed = shortestPathSchema.safeParse(value);
      if (!parsed.success) {
        return c.text("Invalid!", 401);
      }
      return parsed.data;
    }),
    async (c) => {
      const { goal, currentPlace } = c.req.valid("query");

      const data = await readNeo4j<{ stops: PlaceId[] }>(
        `MATCH p = shortestPath((a:Place)-[:ADJACENT_TO*]-(b:Place))
      WHERE a.placeId = $currentPlace AND b.placeId = $goal
      RETURN [n in nodes(p) | n.placeId] AS stops`,
        { goal, currentPlace },
      );

      const stops: PlaceId[] = data[0].stops;
      return c.json({
        stops,
        count: stops.length - 2, // Subtract 2 because we don't want to count the start and end
      });
    },
  )
  .get(
    "/possiblePaths",
    validator("query", (value, c) => {
      const parsed = possiblePathSchema.safeParse(value);
      if (
        !parsed.success ||
        !Number.isInteger(Number(parsed.data.moveNumber))
      ) {
        return c.text("Invalid!", 401);
      }
      return parsed.data;
    }),
    async (c) => {
      const { moveNumber, currentPlace } = c.req.valid("query");

      const data = await readNeo4j<{ p: RoutePath }>(
        `MATCH p = (start:Place {placeId: $currentPlace})-[:ADJACENT_TO*${moveNumber}]-(end:Place)
        RETURN p`,
        { currentPlace },
      );
      const paths = data.map((d) => {
        const end = d.p.end.properties.placeId;
        const path = d.p.segments.map((s) => s.start.properties.placeId);

        return path.concat(end);
      });

      return c.json({ paths });
    },
  );

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
