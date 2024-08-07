import { Hono } from "hono";

export const authRoutes = new Hono()
  .post("/sign-in", (c) => c.json({ message: "logged in" }))
  .post("/sign-up", (c) => c.json({ message: "signed up" }))
  .post("/sign-out", (c) => c.json({ message: "signed out" }));
