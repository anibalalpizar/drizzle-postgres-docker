import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable, type User } from "./db/schema"

const DB_URL = process.env.DATABASE_URL

if (!DB_URL) throw new Error("DATABASE_URL is required")

const db = drizzle(DB_URL)

async function main() {
  await db.delete(usersTable)

  const newuser: User = {
    name: "John Doe",
    age: 30,
    email: "john@vercel.com",
  }

  await db.insert(usersTable).values(newuser)

  const users = await db.select().from(usersTable)

  console.log(users)
}

main().catch(console.error)
