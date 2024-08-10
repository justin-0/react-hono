import type { User } from "@prisma/client";
import { createMiddleware } from "hono/factory";
import { prisma } from "./db";
import type { Context, Next } from "hono";
import { setCookie, getCookie } from "hono/cookie";
import { verifySessionToken } from "./auth";

export type UserDetails = Omit<User, "password_hash">;

type Env = {
  Variables: {
    user: UserDetails;
  };
};

type Payload = {
  id: string;
  iat: number;
  exp: number;
};
// MIDDLEWARE - CHECKS SESSION IS VALID AND THEN SETS A USER ENV FOR ACCESS. NO TOKEN RESULTS IN A UNAUTHORISED ERROR
export const validateAndSetUser = createMiddleware<Env>(
  async (c: Context, next: Next) => {
    try {
      const sessionCookie = getCookie(c, "session");

      if (!sessionCookie) {
        return c.json({ error: "Unauthorized: No session cookie" }, 401);
      }

      const decoded = (await verifySessionToken(sessionCookie)) as Payload;

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          username: true,
          password_hash: false,
        },
      });

      if (!user) {
        setCookie(c, "session", "", { maxAge: 0 });
        return next();
      }

      c.set("user", user);

      await next();
    } catch (error) {
      console.error("Error in setUser middleware:", error);

      setCookie(c, "session", "", { maxAge: 0 });
      await next();
    }
  }
);
