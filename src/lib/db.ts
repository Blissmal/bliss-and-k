import type { PrismaClient } from "@/generated/prisma/client";
import { sampleDb } from "./sample-db";

const g = globalThis as unknown as { prisma?: PrismaClient };

function create(): PrismaClient {
  if (process.env.USE_SAMPLE_DATA === "1") {
    // if (process.env.NODE_ENV === "production") throw new Error("USE_SAMPLE_DATA is for local testing only");
    return sampleDb as unknown as PrismaClient;
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient: Client } = require("@/generated/prisma/client");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaNeon } = require("@prisma/adapter-neon");
  return new Client({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }) });
}

export const db = g.prisma ?? create();
if (process.env.NODE_ENV !== "production") g.prisma = db;
