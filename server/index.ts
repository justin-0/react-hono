import { createHono, createServer } from "./server";
import { PrismaClient } from "@prisma/client";

const app = createHono();
const server = createServer(app);

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        email: "test@gmail.com",
        name: "test",
      },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

main();
