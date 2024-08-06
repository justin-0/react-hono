import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenses } from "./routes/expenses";

function App() {
  // Hono constructor
  const app = new Hono();
  // Middleware
  app.use("*", logger());
  // Routes
  app.route("/api/expenses", expenses);

  return app;
}

function startServer(app: Hono) {
  Bun.serve({ fetch: app.fetch });
}

function HonoServer() {
  const app = App();
  startServer(app);
}

export default HonoServer;
