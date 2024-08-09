import type { Context } from "hono";
import bcryptjs from "bcryptjs";
import { prisma } from "../db";
import { registerSchema } from "../routes/auth";
import { z } from "zod";

export async function createNewUser(
  c: Context,
  result: z.infer<typeof registerSchema>
) {
  try {
    const { username, password } = result;

    if (!username || !password) {
      return c.json(
        {
          message: "Username and password required for registration",
        },
        400
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userExists) {
      return c.json({ message: "User registered with credentials" }, 400);
    }

    const hashedPassword = await hashingPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        password_hash: hashedPassword,
      },
    });

    return c.json({ success: true, newUser }, 201);
  } catch (error) {
    console.log(error);
  }
}

async function hashingPassword(password: string): Promise<string> {
  const saltRounds = 10;
  try {
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Password hashing error:", err.message);
    }
    throw new Error("Failed to hash password");
  }
}
