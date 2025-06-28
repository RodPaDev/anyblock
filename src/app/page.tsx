"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export default  function Page() {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => toast.success("Background job invoked successfully!"),
  }))

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to Anyblock!</h1>
      <Button disabled={invoke.isPending}  onClick={() => invoke.mutate({ email: "john"})} >
        Invoke Background Job
      </Button>
    </div>
  );
}
