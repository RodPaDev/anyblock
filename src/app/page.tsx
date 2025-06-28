"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [value, setValue] = useState<string>("");
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => toast.success("Background job invoked successfully!"),
    })
  );

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to Anyblock!</h1>

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="w-full max-w-md mt-4 mb-4"
      />

      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ value })}
      >
        Invoke Background Job
      </Button>
    </div>
  );
}
