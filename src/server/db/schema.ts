import { relations } from "drizzle-orm";
import {
  ACTION_TYPES,
  COUNTRIES_ALPHA3,
  ID_LENGTH,
  MAP_TYPES,
  PLACE_IDS,
} from "../../constants/db";
// Use relative path instead of absolute path for drizzle kit

import {
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
  deletedAt: timestamp("deleted_at"),
};

const userId = varchar("user_id", {
  length: ID_LENGTH.uid,
});

export const userTable = mysqlTable("user", {
  id: varchar("id", {
    length: ID_LENGTH.uid,
  }).primaryKey(),
  username: varchar("username", { length: 31 }).unique().notNull(),
  imageUrl: text("image_url"),
  email: varchar("email", { length: 256 }).unique().notNull(),
  country: mysqlEnum("country", COUNTRIES_ALPHA3),
  ...updatedAndCreatedAt,
});

export const userRelations = relations(userTable, ({ many }) => ({
  games: many(gameTable),
  players: many(playerTable),
}));

export const gameTable = mysqlTable(
  "game",
  {
    id: varchar("id", {
      length: ID_LENGTH.nano,
    }).primaryKey(),
    totalYears: int("total_years").notNull(),
    mapType: mysqlEnum("map_type", MAP_TYPES).notNull(),
    startPlace: mysqlEnum("start_place", [...PLACE_IDS, "random"])
      .notNull()
      .default("random"),
    ownerId: varchar("owner_id", {
      length: ID_LENGTH.uid,
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
  actions: many(actionTable),
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
  actions: many(actionTable),
}));

export const actionTable = mysqlTable(
  "action",
  {
    id: varchar("id", {
      length: ID_LENGTH.nano,
    }).primaryKey(),
    gameId: varchar("game_id", {
      length: ID_LENGTH.nano,
    }).notNull(),
    userId: userId.notNull(),
    botId: varchar("bot_id", {
      length: ID_LENGTH.nano,
    }),
    year: int("year").notNull(),
    round: int("round").notNull(),
    turn: int("turn").notNull(),
    type: mysqlEnum("type", ACTION_TYPES).notNull(),
    cashAmount: int("cash_amount"),
    moveTo: mysqlEnum("move_to", PLACE_IDS),
    itemId: varchar("item_id", {
      length: 36,
    }),
    ...updatedAndCreatedAt,
  },
  (t) => ({
    gameIdIndex: index("game_id_idx").on(t.gameId),
    userIdIndex: index("user_id_idx").on(t.userId),
  }),
);

export const actionRelations = relations(actionTable, ({ one }) => ({
  game: one(gameTable, {
    fields: [actionTable.gameId],
    references: [gameTable.id],
  }),
  player: one(playerTable, {
    fields: [actionTable.userId, actionTable.gameId],
    references: [playerTable.userId, playerTable.gameId],
  }),
}));
