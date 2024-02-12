import http from "http";
import "dotenv/config";
import { parse } from "path";
import { Database } from "./Database/Database.js";
import { getBodyRq } from "./service/getBodyRq.js";

async function main() {
  const database = new Database();

  const server = http.createServer(async (req, res) => {
    const parsed = parse(req.url);
    const method = req.method.toLowerCase();

    if (req.url.includes("api/users")) {
      let response;
      if (method === "get")
        response = await database.get(
          parsed.name !== "users" ? parsed.name : null
        );
      if (method === "post") {
        const body = await getBodyRq(req);
        response = await database.post(body);
      }
      if (method === "put") {
        const body = await getBodyRq(req);
        response = await database.put(parsed.name, body);
      }
      if (method === "delete") {
        response = await database.delete(parsed.name);
      }
      res.statusCode = response.status;
      res.end(
        typeof response.value === "string"
          ? response.value
          : JSON.stringify(response.value)
      );
    } else {
      res.statusCode = 404;
      res.end(`Path ${req.url} does not exist!`);
    }
  });

  server.listen(process.env.PORT, () => {
    console.log("server is listening on port: ", process.env.PORT);
  });
}

main();
