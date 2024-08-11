import { useUser } from "@/stores/authStore";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: () => {
    const user = useUser();
    if (!user) {
      return (
        <div className="flex items-center justify-center h-28 font-bold text-2xl">
          <Link to="/">Sign in or create your account</Link>
        </div>
      );
    }

    return <Outlet />;
  },
});
