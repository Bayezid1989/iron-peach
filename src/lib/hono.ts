import { AppType } from "@/app/api/[...slug]/route";
import { hc } from "hono/client";

export const honoClient = hc<AppType>("/");
