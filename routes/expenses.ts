import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  amount: z.number(),
});

type ExpenseSchema = z.infer<typeof schema>;
// Create base path for expenses route
export const expensesRoutes = new Hono()
  .get("/", (c) => {
    return c.json({ message: "expense" });
  })
  .post(
    "/",
    zValidator("json", schema, (result, c) => {
      if (!result.success) {
        return c.json(result.error.flatten());
      }
      return c.json({ result });
    })
  )
  .delete("/", (c) => c.json({ message: "expense deleted" }));
