import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [view, setView] = useState<"sign-up" | "sign-in">("sign-up");

  if (view === "sign-in") {
    return <h1>Sign In</h1>;
  } else {
    return <h1>Sign-Up</h1>;
  }
}
