"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [value, setValue] = useState<string>("");
  const trpc = useTRPC();
  const messages = useQuery(trpc.message.getMany.queryOptions());
  const createMessage = useMutation(
    trpc.message.create.mutationOptions({
      onSuccess: () => toast.success("Message created successfully!"),
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
        disabled={createMessage.isPending}
        onClick={() => createMessage.mutate({ value })}
      >
        {createMessage.isPending ? "Creating..." : "Create Message"}
      </Button>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <ul className="space-y-2">
          {messages.data?.map((message) => (
            <li key={message.id} className="p-2 border rounded">
              <strong className="block mb-1">{message.role}</strong>
              {message.content}

              {message.fragment && (
                <a
                  href={message.fragment?.sandboxUrl}
                  className="block mt-2 text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {message.fragment?.title || "View Sandbox"}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
