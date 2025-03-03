import { cn } from "@/lib/utils";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

export function LinkButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "bg-my-primary hover:bg-my-primary-hover text-base-100 hover:[&>svg]:bg-my-primary flex items-center justify-center gap-2 rounded-sm px-4 py-3 font-sans text-base",
        className,
      )}
    >
      {children}
      <AiOutlineArrowRight className="bg-my-primary-hover hidden size-6 p-1 md:flex" />
    </Link>
  );
}
