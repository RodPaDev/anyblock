import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import MessageCard from "./message-card";
import { MessageForm } from "./message-form";
import { useEffect, useRef } from "react";
import { Fragment } from "@/db/schema";
import { MessageLoading } from "./message-loading";

interface Props {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
}

export default function MessagesContainer({ projectId, activeFragment, setActiveFragment }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const trpc = useTRPC();
  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({
      projectId,
    }, {
      refetchInterval: 5000, // TODO: temporary live message update
    }),
  );

  useEffect(() => {
    const latestAssistantMessageWithFragment = messages.findLast(
      (message) => message.role === "assistant" && !!message.fragment
    );

    if (latestAssistantMessageWithFragment) {
      setActiveFragment(latestAssistantMessageWithFragment.fragment);
    }
  }, [messages, setActiveFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages.length]);

  const isLastMessageFromUser = messages.length > 0 && messages.at(-1)?.role === "user";

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              role={message.role}
              fragment={message.fragment}
              createdAt={message.createdAt}
              isActiveFragment={activeFragment?.id === message.fragment?.id}
              onFagmentClick={() => setActiveFragment(message.fragment || null)}
              type={message.type}
            />
          ))}
          {isLastMessageFromUser && (
           <MessageLoading />
          )}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="relative p-3 pt-1">
        <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
}
