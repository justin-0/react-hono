import { Hono } from "hono";
import { logger } from "hono/logger";

function HonoServer() {
  // Hono constructor
  const app = new Hono();
  // Middleware
  app.use("*", logger());

  app.get("/", (c) => c.text("Hello Bun!"));
  // Bun server
  Bun.serve({ fetch: app.fetch });
}

export default HonoServer;
