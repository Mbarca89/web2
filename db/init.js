import fs from "fs"
import path from "path"
import { Client } from "pg"
import dotenv from "dotenv"

dotenv.config();

async function initDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();

    const sqlPath = path.join(__dirname, "backup.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    await client.query(sql);

    console.log("Database initialized from backup.sql");

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

initDatabase();