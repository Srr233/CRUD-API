import path from "path";
import { getDatabase } from "./getDatabase.js";
import fs from "fs/promises";

const pathToDatabase = path.normalize(process.env.DATABASE_PATH);

async function updateUser(id, userData) {
  const database = await getDatabase();

  const userIndex = database.findIndex((v) => v.id == id);

  if (userIndex > -1) {
    userData.id = id;
    database[userIndex] = userData;
    await fs.writeFile(pathToDatabase, JSON.stringify(database));
    return { status: 200, value: JSON.stringify(userData) };
  } else {
    return { status: 404, value: "user has not found!" };
  }
}

export { updateUser };
