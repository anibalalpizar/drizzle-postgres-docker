import "dotenv/config"
import { defineConfig } from "drizzle-kit"

const DB_URL = process.env.DATABASE_URL

if (!DB_URL) throw new Error("DATABASE_URL is required")

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
})
