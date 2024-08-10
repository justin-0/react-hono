import { CreateExpenseForm } from "@/components/forms/create-expense";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [view, setView] = useState<"sign-up" | "sign-in">("sign-up");

  // return (
  //   <div className="h-screen w-full">
  //     <div className="flex items-center justify-center mt-28 sm:mt-32">
  //       <Card className="w-[350px] sm:w-[450px] border-black/40">
  //         <CardHeader>
  //           <CardTitle>Create your expense</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <CreateExpenseForm />
  //         </CardContent>
  //       </Card>
  //     </div>
  //   </div>
  // );

  if (view === "sign-in") {
    return <h1>Sign In</h1>;
  } else {
    return <h1>Sign-Up</h1>;
  }
}
