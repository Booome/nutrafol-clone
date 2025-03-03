import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getComputedPropertyValue(className: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(className)
    .trim();
}
