import { Hono } from "hono";
// Create base path for expenses route
export const expensesRoutes = new Hono()
  .get("/", (c) => {
    return c.json({ message: "expense" });
  })
  .post("/", (c) => c.json({ message: "new expense" }))
  .delete("/", (c) => c.json({ message: "expense deleted" }));
