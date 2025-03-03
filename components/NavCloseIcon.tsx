import { cn } from "@/lib/utils";

export function NavCloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" className={cn("size-4", className)}>
      <title>Select to close menu</title>
      <path
        d="M13 1.00109L1 13M13 13L1.00055 1"
        stroke="#22202F"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
