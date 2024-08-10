import { authRoutes } from "./auth";
import { expensesRoutes } from "./expenses";
import { Hono } from "hono";

const app = new Hono();
// API ROUTES AND BASEPATH TO APPEND OTHER ROUTES
export const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expensesRoutes)
  .route("/auth", authRoutes);
// EXPORTED FOR RPC TO CONNECT TO CLIENT
export type ApiRoutes = typeof apiRoutes;
