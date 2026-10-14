import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function $<T extends Element = HTMLElement>(selector: string) {
  return document.querySelector<T>(selector);
}
export function $$<T extends Element = HTMLElement>(selector: string) {
  return document.querySelectorAll<T>(selector);
}
