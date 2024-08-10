import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "../db";

export const schema = z.object({
  title: z.string(),
  amount: z.number(),
});

// Create base path for expenses route
export const expensesRoutes = new Hono()
  .get("/", (c) => {
    return c.json({ message: "expense" });
  })
  .post(
    "/",
    zValidator("json", schema, async (result, c) => {
      if (!result.success) {
        return c.json(result.error.flatten());
      }
      const data = result.data;
      // TODO: GET user_Id - likely from c.req with middleware setting a user object
      // const newPost = await prisma.expense.create({
      //   data: {
      //     title: data.title,
      //     amount: data.amount,
      //     userId: "",
      //   },
      // });

      return c.json(201);
    })
  )
  .delete("/", (c) => c.json({ message: "expense deleted" }));
