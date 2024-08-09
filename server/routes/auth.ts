import { Hono } from "hono";
import { setUser } from "../middleware";
import { createNewUser } from "../auth";
import { useRef } from "hono/jsx";

export const authRoutes = new Hono()
  .post("/sign-in", setUser, (c) => c.json({ message: "logged in" }))
  .post("/sign-up", async (c) => {
    const user = await createNewUser(c);
    return user;
  })
  .post("/sign-out", (c) => c.json({ message: "signed out" }));
