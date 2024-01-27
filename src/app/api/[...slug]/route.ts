import { Hono } from "hono";
import { handle } from "hono/vercel";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

const route = app
  .post("/hello", (c) => {
    return c.json({
      message: `Hello !`,
    });
  })
  .get("/shortestPath", (c) => c.json({ result: "list books" }));

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);

// export type AppType = typeof app;
