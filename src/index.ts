import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import { todo } from "./instance/todo";

const app = new Elysia()
  // *  Apply the swagger plugin
  .use(swagger())
  .use(todo)
  .onError(({ code }) => {
    if (code === "NOT_FOUND") {
      return "Route not found :(";
    }
  })
  .listen(8080);
