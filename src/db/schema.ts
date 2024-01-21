import { relations } from "drizzle-orm";
import {
  COUNTRIES_ALPHA3,
  ID_LENGTH,
  MAP_TYPES,
  PLACE_IDS,
} from "@/constants/db"; // Use relative path instead of absolute path for drizzle kit
import {
  bigint,
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

const updatedAndCreatedAt = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
};

const nanoId12 = varchar("id", {
  length: ID_LENGTH.nano,
}).primaryKey();

const userId = varchar("user_id", {
  length: ID_LENGTH.userId,
});

export const userTable = mysqlTable("user", {
  id: varchar("id", {
    length: ID_LENGTH.userId, // change this when using custom user ids
  }).primaryKey(),
  username: varchar("username", {
    length: 31,
  })
    .unique()
    .notNull(),
  email: varchar("email", { length: 255 }).unique(),
  emailVerified: boolean("email_verified"),
  imageUrl: text("image_url"),
  googleUsername: varchar("google_username", { length: 31 }).unique(),
  country: mysqlEnum("country", COUNTRIES_ALPHA3),
  ...updatedAndCreatedAt,
});

export const authKeyTable = mysqlTable("auth_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: userId.notNull(),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});

export const authSessionTable = mysqlTable("auth_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: userId.notNull(),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const emailVerificationTokenTable = mysqlTable(
  "email_verification_token",
  {
    id: varchar("id", {
      length: 128,
    }).primaryKey(),
    userId: userId.notNull(),
    expires: bigint("expires", {
      mode: "number",
    }).notNull(),
  },
);

export const passwordResetTokenTable = mysqlTable("password_reset_token", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: userId.notNull(),
  expires: bigint("expires", {
    mode: "number",
  }).notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  games: many(gameTable),
  players: many(playerTable),
}));

export const gameTable = mysqlTable(
  "game",
  {
    id: nanoId12,
    totalYears: int("total_years").notNull(),
    year: int("year").notNull().default(1),
    round: int("round").notNull().default(1),
    turn: int("turn").notNull().default(1),
    mapType: mysqlEnum("map_type", MAP_TYPES).notNull(),
    ownerId: varchar("owner_id", {
      length: ID_LENGTH.userId,
    }).notNull(),
    ...updatedAndCreatedAt,
  },
  (t) => ({
    ownerIdIndex: index("owner_id_idx").on(t.ownerId),
  }),
);

export const gameRelations = relations(gameTable, ({ many, one }) => ({
  owner: one(userTable, {
    fields: [gameTable.ownerId],
    references: [userTable.id],
  }),
  players: many(playerTable),
  // bots
}));

export const playerTable = mysqlTable(
  "player",
  {
    userId: userId.notNull(),
    gameId: varchar("game_id", {
      length: ID_LENGTH.nano,
    }).notNull(),
    order: int("order"),
    currentPlace: mysqlEnum("current_place", PLACE_IDS),
    balance: int("balance").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.gameId] }),
    userIdIndex: index("user_id_idx").on(t.userId),
    gameIdIndex: index("game_id_idx").on(t.gameId),
  }),
);

export const playerRelations = relations(playerTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [playerTable.userId],
    references: [userTable.id],
  }),
  game: one(gameTable, {
    fields: [playerTable.gameId],
    references: [gameTable.id],
  }),
}));
