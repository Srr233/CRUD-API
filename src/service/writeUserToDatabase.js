import fs from "fs/promises";
import path from "path";
import { getDatabase } from "./getDatabase.js";
import { randomUUID } from "crypto";

const pathToDatabase = path.normalize(process.env.DATABASE_PATH);

async function writeUserToDatabase(user) {
  user.id = randomUUID();
  const database = await getDatabase();
  database.push(user);
  await fs.writeFile(pathToDatabase, JSON.stringify(database));

  return { status: 201, value: JSON.stringify(user) };
}

export { writeUserToDatabase };
