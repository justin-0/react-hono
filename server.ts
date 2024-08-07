import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expenses";
import { authRoutes } from "./routes/auth";

export function createHono() {
  // Create hono instance with a base path of '/api'
  const app = new Hono().basePath("/api");
  // Use logger middleware
  app.use(logger());
  // app (/api) use expenses route which has basepath of (/expenses) = /api/expenses
  app.route("/", expensesRoutes).route("/", authRoutes);
  // Return hono
  return app;
}

// Take app as argument
export function createServer(app: Hono) {
  // Return bun server which uses hono fetch to deal with req/res cycle
  return Bun.serve({
    fetch: app.fetch,
  });
}
