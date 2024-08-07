import { Hono } from "hono";
// Create base path for expenses route
export const expenses = new Hono().basePath("/expenses");

// Chain http verbs to expense
expenses
  // api/expenses - GET - return expenses
  .get("/", (c) => {
    return c.json({ message: "expense" });
  })
  // api/expenses - POST - create expenses
  .post("/", (c) => c.json({ message: "new expense" }))
  //   api/expenses - DELETE - delete expense
  .delete("/", (c) => c.json({ message: "expense deleted" }));
