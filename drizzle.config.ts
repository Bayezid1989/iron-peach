import type { Config } from "drizzle-kit";

// Use "drizzle-kit push:mysql" instead of migrations
// drizzle-kit studio
const drizzleConfig = {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL || "",
  },
  verbose: true,
} satisfies Config;

export default drizzleConfig;
