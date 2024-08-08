import type { User } from "@prisma/client";
import { createMiddleware } from "hono/factory";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Env = {
  Variables: {
    user: User;
  };
};

export const setUser = createMiddleware<Env>(async (c, next) => {
  if (c.req.method !== "POST") {
    next();
  }

  try {
    const { username } = await c.req.json();

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return c.json({ message: "User not found with credentials" }, 401);
    }

    c.set("user", user);
    await next();
  } catch (error) {
    console.log(error);
  }
});
