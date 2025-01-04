import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"

const DB_URL = process.env.DATABASE_URL

if (!DB_URL) throw new Error("DATABASE_URL is required")

const db = drizzle(DB_URL)
