import { Hono } from "hono";

export const auth = new Hono();

auth
  .post("/auth/sign-in", (c) => c.json({ message: "logged in" }))
  .post("/auth/sign-up", (c) => c.json({ message: "signed up" }))
  .post("/auth/sign-out", (c) => c.json({ message: "signed out" }));
