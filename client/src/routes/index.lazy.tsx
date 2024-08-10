import { SignInForm } from "@/components/forms/sign-in";
import { SignUpForm } from "@/components/forms/sign-up";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [view, setView] = useState<"sign-up" | "sign-in">("sign-up");

  const toggleView = () => {
    setView((prevView) => (prevView === "sign-up" ? "sign-in" : "sign-up"));
  };

  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-center mt-28 sm:mt-32">
        <Card className="w-[350px] sm:w-[450px] border-black/40">
          <CardHeader>
            <CardTitle>
              {view === "sign-up"
                ? "Create your account"
                : "Sign into your account"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {view === "sign-up" ? <SignUpForm /> : <SignInForm />}
            <CardDescription className="mt-4" onClick={toggleView}>
              {view === "sign-up"
                ? "Already got an account?"
                : "Create your account"}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
