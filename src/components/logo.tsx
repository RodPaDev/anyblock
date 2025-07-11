import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 50 }: LogoProps) {
  return (
    <span
      className={cn("relative inline-blockß", `size-[${size}px]`, className)}
    >
      {/* Light mode */}
      <Image
        src="/anyblock-white-simple.png"
        alt="Anyblock Logo"
        width={size}
        height={size}
        className="block dark:hidden shrink-0"
        priority
      />
      {/* Dark mode */}
      <Image
        src="/anyblock-black.png"
        alt="Anyblock Logo"
        width={size}
        height={size}
        className="hidden dark:block shrink-0"
        priority
      />
    </span>
  );
}
