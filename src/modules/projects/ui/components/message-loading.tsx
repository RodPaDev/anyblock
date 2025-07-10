import Logo from "@/components/logo";
import Image from "next/image";
import { useEffect, useState } from "react";

const ShimmerMessages = ({ intervalMs = 3000 }: { intervalMs: number }) => {
  const messages = [
    "Generating the next unicorn...",
    "Vibe-coding your financial freedom...",
    "Building 40k MMR SaaS...",
    "Injecting caffeine into the stack...",
    "Crafting blocks of genius...",
    "Compiling dreams...",
    "Shipping pixels and promises...",
    "Pushing to prod (maybe)...",
    "One block at a time...",
    "Scaling the unscalable...",
    "Running on vibes and TypeScript...",
    "Loading the next breakthrough...",
    "Brewing product-market fit...",
    "Manifesting 10x code...",
    "Escaping tutorial hell...",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [messages.length, intervalMs]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-muted-foreground animate-pulse">
        {messages[currentMessage]}
      </span>
    </div>
  );
};

export function MessageLoading() {
  return (
    <div className="flex flex-col group px-2 pb-4">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Logo />
        <span className="text-sm font-medium tracking-widest uppercase">
          Anyblock
        </span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4 mb-4">
        <ShimmerMessages intervalMs={3000} />
      </div>
    </div>
  );
}
