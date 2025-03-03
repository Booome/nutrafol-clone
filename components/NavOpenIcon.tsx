import { cn } from "@/lib/utils";

export function NavOpenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 14" fill="none" className={cn("size-4", className)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 1C0.5 0.723858 0.723858 0.5 1 0.5H17C17.2761 0.5 17.5 0.723858 17.5 1C17.5 1.27614 17.2761 1.5 17 1.5H1C0.723858 1.5 0.5 1.27614 0.5 1ZM0.5 7C0.5 6.72386 0.723858 6.5 1 6.5H17C17.2761 6.5 17.5 6.72386 17.5 7C17.5 7.27614 17.2761 7.5 17 7.5H1C0.723858 7.5 0.5 7.27614 0.5 7ZM1 12.5C0.723858 12.5 0.5 12.7239 0.5 13C0.5 13.2761 0.723858 13.5 1 13.5H17C17.2761 13.5 17.5 13.2761 17.5 13C17.5 12.7239 17.2761 12.5 17 12.5H1Z"
        fill="#22202F"
      ></path>
    </svg>
  );
}
