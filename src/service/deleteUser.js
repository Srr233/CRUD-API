import path from "path";
import { getDatabase } from "./getDatabase.js";
import fs from "fs/promises";
import { checkId } from "./checkId.js";

const pathToDatabase = path.normalize(process.env.DATABASE_PATH);

async function deleteUser(id = "") {
  const database = await getDatabase();

  if (checkId(id)) {
    const newDatabase = database.filter((v) => v.id != id);

    if (database.length > newDatabase.length) {
      await fs.writeFile(pathToDatabase, JSON.stringify(newDatabase));
      return { status: 204, value: "user successfully deleted" };
    } else {
      return { status: 404, value: "user not found" };
    }
  } else {
    return { status: 400, value: "id is not valid" };
  }
}

export { deleteUser };
