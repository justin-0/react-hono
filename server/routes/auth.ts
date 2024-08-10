import { Hono } from "hono";
import { authenticateUser, createNewUser } from "../auth";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { validateAndSetUser } from "../middleware";
// SCHEMA FOR A NEW USER
export const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// AUTH ROUTES
export const authRoutes = new Hono()
  .post(
    "/sign-in",
    // HONO ZOD VALIDATOR
    zValidator("json", registerSchema, async (result, c) => {
      if (!result.success) {
        return c.json(result.error.flatten(), 400);
      }

      const data = result.data;
      // FUNCTION RECEIVES THE EXACT DATA SCHEMA FROM ZOD RESULT
      const authenticated = await authenticateUser(c, data);
      return authenticated;
    }),
    validateAndSetUser
  )
  .post(
    "/sign-up",
    zValidator("json", registerSchema, async (result, c) => {
      console.log("SIGN-UP-ROUTE");
      if (!result.success) {
        return c.json(result.error.flatten(), 400);
      }

      const data = result.data;
      const user = await createNewUser(c, data);
      return user;
    })
  )
  .post("/sign-out", (c) => c.json({ message: "signed out" }));
