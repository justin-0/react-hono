import { Button } from "@/components/ui/button";
import { useUser } from "@/stores/authStore";

import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Landmark, LogOutIcon } from "lucide-react";

export const Route = createRootRoute({
  component: () => {
    const user = useUser();
    return (
      <div className="bg-neutral-200 min-h-screen">
        <div className="flex items-center justify-between w-11/12 mx-auto py-4">
          <div>
            <Link to="/" className="[&.active]:font-bold">
              <Landmark className="h-6 w-6" />
            </Link>{" "}
          </div>

          {user && (
            <div className="flex items-center justify-center gap-x-6">
              <Link to="/create" className="[&.active]:font-bold">
                Create
              </Link>
              <Link to="/transactions" className="[&.active]:font-bold">
                Transactions
              </Link>
              <Link to="/analytics" className="[&.active]:font-bold">
                Analytics
              </Link>

              <Button size="icon" className="h-8 w-8">
                <LogOutIcon className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  },
});
