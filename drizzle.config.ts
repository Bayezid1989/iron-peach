import type { Config } from "drizzle-kit";

// Use "drizzle-kit push:mysql" instead of migrations
const drizzleConfig = {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL || "",
  },
  verbose: true,
} satisfies Config;

export default drizzleConfig;
