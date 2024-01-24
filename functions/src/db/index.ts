import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect, type Config } from "@planetscale/database";
import * as schema from "./schema";

const config: Config = {
  url: process.env.DATABASE_URL,
};

export const connection = connect(config);

export const db = drizzle(connection, { schema });
