import { PrismaClient } from "@prisma/client/extension";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const sqlite = new Database(dbPath);
const adapter = new PrismaBetterSqlite3(sqlite);

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
