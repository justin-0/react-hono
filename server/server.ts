import { Hono } from "hono";
import { logger } from "hono/logger";
import { apiRoutes } from "./routes";
import { validateAndSetUser } from "./middleware";

export function createHono() {
  const app = new Hono();
  app.use("*", logger());
  app.route("/", apiRoutes);

  return app;
}

// Take app as argument
export function createServer(app: Hono) {
  // Return bun server which uses hono fetch to deal with req/res cycle
  return Bun.serve({
    fetch: app.fetch,
  });
}
