import { Hono } from "hono";

export const expenses = new Hono()
  .get("/", (c) => {
    return c.json({ message: "all expenses", expenses: [] });
  })
  .get("/:id", (c) => {
    return c.json({ message: `Expense for ${c.req.param("id")}` });
  })
  .post("/", (c) => {
    return c.json({ message: "new expense" });
  });
