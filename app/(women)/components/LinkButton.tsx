import { cn } from "@/lib/utils";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

export function LinkButton({
  children,
  href,
  className,
  showIcon = false,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "bg-my-primary hover:bg-my-primary-hover text-base-100 hover:[&>svg]:bg-my-primary flex items-center justify-center gap-2 rounded-sm px-4 py-3 h-12 lg:h-14 font-sans text-base",
        className,
      )}
    >
      {children}
      <AiOutlineArrowRight
        className={cn(
          "bg-my-primary-hover hidden size-6 p-1 md:flex",
          showIcon ? "block md:block" : "hidden",
        )}
      />
    </Link>
  );
}
