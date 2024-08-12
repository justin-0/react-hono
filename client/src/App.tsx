import { RouterProvider } from "@tanstack/react-router";
import { router } from "./main";
import { useUser } from "./stores/authStore";
import { MyRouteContext } from "./routes/__root";

export default function App() {
  // const auth = useUser();
  const auth = useUser();
  const routeContext: MyRouteContext = {
    auth: auth ?? undefined!, // Use nullish coalescing to handle null case
  };
  return <RouterProvider router={router} context={routeContext} />;
}
