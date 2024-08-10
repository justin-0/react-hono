import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Landmark } from "lucide-react";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-neutral-200 min-h-screen">
      <div className="p-2 flex gap-2 items-center justify-center">
        <Link to="/" className="[&.active]:font-bold">
          <Landmark className="h-6 w-6" />
        </Link>{" "}
        <Link to="/create" className="[&.active]:font-bold">
          Create
        </Link>
        <Link to="/transactions" className="[&.active]:font-bold">
          Transactions
        </Link>
        <Link to="/analytics" className="[&.active]:font-bold">
          Analytics
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
