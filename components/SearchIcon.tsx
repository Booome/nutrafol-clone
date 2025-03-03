import { cn } from "@/lib/utils";

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("size-4", className)}>
      <g id="Simple/Search">
        <path
          id="Icon"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.90039 10.7999C2.90039 6.43685 6.43744 2.8999 10.8006 2.8999C15.1639 2.8999 18.7009 6.43685 18.7009 10.7999C18.7009 15.1629 15.1639 18.6998 10.8006 18.6998C6.43744 18.6998 2.90039 15.1629 2.90039 10.7999ZM10.8006 1.8999C5.88519 1.8999 1.90039 5.88453 1.90039 10.7999C1.90039 15.7152 5.88519 19.6998 10.8006 19.6998C13.0783 19.6998 15.1562 18.8443 16.7304 17.437L21.2468 21.9535L21.6004 22.307L22.3075 21.5999L21.9539 21.2463L17.4375 16.7299C18.8451 15.1557 19.7009 13.0777 19.7009 10.7999C19.7009 5.88453 15.7161 1.8999 10.8006 1.8999Z"
          fill="#041C1B"
        ></path>
      </g>
    </svg>
  );
}
