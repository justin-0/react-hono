import { Hono } from "hono";
import { setUser } from "../middleware";

export const authRoutes = new Hono()
  .post("/sign-in", setUser, (c) => c.json({ message: "logged in" }))
  .post("/sign-up", (c) => c.json({ message: "signed up" }))
  .post("/sign-out", (c) => c.json({ message: "signed out" }));
