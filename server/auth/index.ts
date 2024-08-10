import type { Context } from "hono";
import { setCookie } from "hono/cookie";
import bcryptjs from "bcryptjs";
import { prisma } from "../db";
import { registerSchema } from "../routes/auth";
import { z } from "zod";
import * as jose from "jose";
import "dotenv/config";

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
      select: {
        password_hash: false,
        username: true,
        id: true,
      },
    });

    return c.json({ success: true, newUser }, 201);
  } catch (error) {
    console.log(error);
  }
}

export async function authenticateUser(
  c: Context,
  result: z.infer<typeof registerSchema>
) {
  try {
    const { username, password } = result;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    const isMatching = bcryptjs.compare(password, user.password_hash);

    if (!isMatching) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    const session = await createSessionToken(user.id);

    setCookie(c, "session", session, {
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
      maxAge: 7200,
    });

    return c.json({ mesage: "User logged in" }, 201);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Internal Server Error" }, 500);
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

async function createSessionToken(id: string) {
  const payload = {
    id,
  };

  const secret = new TextEncoder().encode(process.env.SECRET);

  const sessionJWT = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  return sessionJWT;
}

async function verifySessionToken(jwt: string) {
  const secret = new TextEncoder().encode(process.env.SECRET);

  const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret);

  return payload;
}
