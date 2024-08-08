import { authRoutes } from "./auth";
import { expensesRoutes } from "./expenses";
import { Hono } from "hono";

const app = new Hono();

export const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expensesRoutes)
  .route("/auth", authRoutes);

export type ApiRoutes = typeof apiRoutes;
