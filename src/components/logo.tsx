import { cn } from "@/lib/utils";
import Image from "next/image";


export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block w-[40px] h-[40px]", className)}>
      {/* Light mode */}
      <Image
        src="/anyblock-white-simple.png"
        alt="Anyblock Logo"
        width={40}
        height={40}
        className="block dark:hidden shrink-0"
        priority
      />
      {/* Dark mode */}
      <Image
        src="/anyblock-black.png"
        alt="Anyblock Logo"
        width={40}
        height={40}
        className="hidden dark:block shrink-0"
        priority
      />
    </span>
  );
}
