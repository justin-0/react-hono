import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/analytics")({
  component: Analytics,
});

function Analytics() {
  return <div className="p-2">Hello from Analytics!</div>;
}
