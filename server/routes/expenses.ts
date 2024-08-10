import { zValidator } from "@hono/zod-validator";
import { Hono, type Context } from "hono";
import { z } from "zod";
import { prisma } from "../db";
import { validateAndSetUser } from "../middleware";

export const schema = z.object({
  title: z.string(),
  amount: z.number(),
});

// Create base path for expenses route
const expensesRoutes = new Hono();

expensesRoutes.use("*", validateAndSetUser);

expensesRoutes
  .get("/", (c: Context) => {
    console.log("USER_OBJECT", c.get("user"));
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

export { expensesRoutes };
