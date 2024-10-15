import { Elysia, t } from "elysia";

import { prismaClient } from "../config/prisma";

const todoBody = t.Object({
  title: t.String(),
  body: t.String(),
});

export const todo = new Elysia({ prefix: "/todo" })
  .get("/", async ({ error }) => {
    try {
      const result = await prismaClient.todo.findMany({});

      return result;
    } catch (err) {
      console.log(err);
      return error(500, "Something Went Wrong");
    }
  })
  .get(
    "/:uuid",
    async ({ params: { uuid }, error }) => {
      try {
        const result = await prismaClient.todo.findFirst({
          where: {
            id: uuid,
          },
        });

        return result;
      } catch (err) {
        console.log(err);
        return error(500, "Something Went Wrong");
      }
    },
    {}
  )
  .post(
    "/",
    async ({ body: { title, body }, error }) => {
      try {
        const result = await prismaClient.todo.create({
          data: {
            title,
            body,
          },
        });

        return result;
      } catch (err) {
        console.log(err);
        return error(500, "Something Went Wrong");
      }
    },
    { body: todoBody }
  )
  .put(
    "/:uuid",
    async ({ params: { uuid }, body: { title, body }, error }) => {
      try {
        const result = await prismaClient.todo.update({
          where: {
            id: uuid,
          },
          data: {
            title,
            body,
          },
        });

        return result;
      } catch (err) {
        console.log(err);
        return error(500, "Something Went Wrong");
      }
    },
    {
      body: todoBody,
    }
  )
  .delete(
    "/:uuid",
    async ({ params: { uuid }, error }) => {
      try {
        const result = await prismaClient.todo.delete({
          where: {
            id: uuid,
          },
        });

        return result;
      } catch (err) {
        console.log(err);
        return error(500, "Something Went Wrong");
      }
    },
    {}
  );
