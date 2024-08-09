import { Hono } from "hono";
import { setUser } from "../middleware";
import { createNewUser } from "../auth";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const authRoutes = new Hono()
  .post("/sign-in", setUser, (c) => c.json({ message: "logged in" }))
  .post(
    "/sign-up",
    zValidator("json", registerSchema, async (result, c) => {
      if (!result.success) {
        return c.json(result.error.flatten());
      }

      const data = result.data;
      const user = await createNewUser(c, data);
      return user;
    })
  )
  .post("/sign-out", (c) => c.json({ message: "signed out" }));
