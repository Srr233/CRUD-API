import fs from "fs/promises";
import path from "path";

const pathToDatabase = path.normalize(process.env.DATABASE_PATH);
async function getDatabase() {
  return JSON.parse(await fs.readFile(pathToDatabase));
}
export { getDatabase };
