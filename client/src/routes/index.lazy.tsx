import { CreateExpenseForm } from "@/components/forms/create-expense";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-center mt-28 sm:mt-32">
        <Card className="w-[350px] sm:w-[450px] border-black/40">
          <CardHeader>
            <CardTitle>Create your expense</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateExpenseForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
