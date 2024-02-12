import { checkId } from "../service/checkId.js";
import { isCorrectUserData } from "../service/checkUserData.js";
import { getDatabase } from "../service/getDatabase.js";
import { updateUser } from "../service/updateUser.js";
import { writeUserToDatabase } from "../service/writeUserToDatabase.js";
import { deleteUser } from "../service/deleteUser.js";

class Database {
  constructor() {
    this._userTypes = [
      { key: "username", funcCheck: (val) => typeof val === "string" },
      { key: "age", funcCheck: (val) => !isNaN(+val) },
      { key: "hobbies", funcCheck: (val) => Array.isArray(val) },
    ];
  }

  async get(id) {
    try {
      const database = await getDatabase();
      if (id) {
        if (!checkId(id)) {
          return { status: 400, value: null };
        }

        const user = database.find((user) => user.id == id);
        if (user) {
          return { status: 200, value: user };
        }
        return { status: 404, value: "User not found" };
      } else {
        return {
          status: 200,
          value: database,
        };
      }
    } catch (err) {
      return { status: 500, value: null };
    }
  }

  async post(newUser) {
    try {
      if (isCorrectUserData(newUser, this._userTypes)) {
        return await writeUserToDatabase(newUser);
      } else {
        return {
          status: 400,
          value: `${JSON.stringify(newUser)} \n not correct value`,
        };
      }
    } catch (err) {
      return { status: 500, value: null };
    }
  }

  async put(id = "", userData) {
    if (checkId(id)) {
      if (isCorrectUserData(userData, this._userTypes)) {
        return await updateUser(id, userData);
      } else {
        return {
          status: 400,
          value: `${JSON.stringify(userData)} not correct keys`,
        };
      }
    } else {
      return { status: 400, value: `${id} is not valid for ID!` };
    }
  }

  async delete(id = "") {
    if (checkId(id)) {
      return await deleteUser(id);
    } else {
      return { status: 400, value: `id is not valid` };
    }
  }
}

export { Database };
