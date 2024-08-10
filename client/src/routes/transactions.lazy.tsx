import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/transactions")({
  component: Transactions,
});

function Transactions() {
  return <div className="p-2">Hello from Transactions!</div>;
}
