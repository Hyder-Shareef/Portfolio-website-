import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  return dateStr;
}

export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
