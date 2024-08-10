import type { Context } from "hono";
import { setCookie } from "hono/cookie";
import bcryptjs from "bcryptjs";
import { prisma } from "../db";
import { registerSchema } from "../routes/auth";
import { z } from "zod";
import * as jose from "jose";
import "dotenv/config";

// CREATE NEW USER TO INSERT INTO DB
export async function createNewUser(
  // HONO CONTEXT
  c: Context,
  // RESULT SCHEMA INFERRED WITH ZOD
  result: z.infer<typeof registerSchema>
) {
  try {
    // GET USERNAME AND PASSWORD FROM ZVALIDATOR RESULT
    const { username, password } = result;
    // NO USERNAME OR PASSWORD RETURN ERROR
    if (!username || !password) {
      return c.json(
        {
          message: "Username and password required for registration",
        },
        400
      );
    }
    // CHECK IF USER EXISTS
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    // TELLS NEW USER THAT WE HAVE AN ACCOUNT WITH THOSE CREDENTIALS
    if (userExists) {
      return c.json({ message: "User registered with credentials" }, 400);
    }
    // HASHPASSWORD
    const hashedPassword = await hashingPassword(password);
    // CREATE NEW USER BUT OMIT PASSWORD
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
    // RETURN SUCCESS
    return c.json({ success: true, newUser }, 201);
  } catch (error) {
    console.log(error);
  }
}

// ROLE - FIND USER, CHECK PASSWORD AND CREATE SESSION
export async function authenticateUser(
  c: Context,
  result: z.infer<typeof registerSchema>
) {
  try {
    const { username, password } = result;
    // FIND USER
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return c.json({ message: "Invalid credentials" }, 401);
    }
    // DO PASSWORD AND HASHED PASSWORD MATCH?
    const isMatching = bcryptjs.compare(password, user.password_hash);

    if (!isMatching) {
      return c.json({ message: "Invalid credentials" }, 401);
    }
    // CREATE SESSION AND SIGN WITH USER ID
    const session = await createSessionToken(user.id);
    // SET COOKIE
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

// BCRYPTJS HASH PASSWORD HELPER
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

// CREATE TOKEN WITH JOSE LIBRARY
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
// VERIFY OUR TOKEN
export async function verifySessionToken(jwt: string) {
  const secret = new TextEncoder().encode(process.env.SECRET);

  const { payload } = await jose.jwtVerify(jwt, secret);

  return payload;
}
