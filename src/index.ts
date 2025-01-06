import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable, type User } from "./db/schema"
import { and, eq } from "drizzle-orm"
import * as schema from "./db/schema"

const DB_URL = process.env.DATABASE_URL

if (!DB_URL) throw new Error("DATABASE_URL is required")

const db = drizzle(DB_URL, { schema })

async function main() {
  await db.delete(usersTable)

  const newuser: User = {
    name: "John Doe",
    age: 30,
    email: "john@vercel.com",
  }

  await db.insert(usersTable).values(newuser)

  const users = await db.select().from(usersTable)

  console.log("User inserted")
  console.log(users)

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(
      and(
        eq(usersTable.email, newuser.email),
        eq(usersTable.name, newuser.name)
      )
    )

  const usersAfterUpdate = await db.query.usersTable.findMany()

  console.log("User updated")
  console.log(usersAfterUpdate)

  const findedUser = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.email, newuser.email),
  })

  console.log("User finded")
  console.log(findedUser)

  await db.delete(usersTable).where(eq(usersTable.email, "john@vercel.com"))

  console.log("User deleted")
}

main().catch(console.error)
