import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

type Expenses = {
  id: number;
  title: string;
  amount: number;
  category: "expense" | "income";
};

const mockExpenses: Array<Expenses> = [
  {
    id: 1,
    title: "Groceries",
    amount: 150,
    category: "expense",
  },
  {
    id: 2,
    title: "Salary",
    amount: 3000,
    category: "income",
  },
  {
    id: 3,
    title: "Utility Bills",
    amount: 200,
    category: "expense",
  },
];

const expenseCategory = z.enum(["income", "expense"]);

const expenseSchema = z.object({
  title: z.string(),
  amount: z.number(),
  category: expenseCategory,
});

export const expenses = new Hono()
  .get("/", (c) => {
    return c.json({ message: "all expenses", expenses: mockExpenses });
  })
  .get("/:id", (c) => {
    const id = c.req.param("id");
    const expenseId = parseInt(id);
    return c.json({
      message: `Expense for ${c.req.param("id")}`,
      expense: mockExpenses.filter((expense) => expense.id === expenseId),
    });
  })
  .post(
    "/",
    zValidator("json", expenseSchema, (result, c) => {
      if (!result.success) {
        return c.json({ error: result.error });
      }
      return c.json({ message: "expense created", success: result.success });
    })
  );
