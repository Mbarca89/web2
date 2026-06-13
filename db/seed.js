import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { Client } from "pg"
import dotenv from "dotenv"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function seedDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect()

    const sqlPath = path.join(__dirname, "seed.sql")
    const sql = fs.readFileSync(sqlPath, "utf8")

    await client.query(sql)

    console.log("Database populated from seed.sql")

    await client.end()
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1);
  }
}

seedDatabase()