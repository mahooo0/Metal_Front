import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(input: string | number | Date) {
  const date =
    typeof input === "string" || typeof input === "number"
      ? new Date(input)
      : input;
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }
  const diffMs = Date.now() - date.getTime();
  if (diffMs < 0) {
    return "just now";
  }
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) {
    const m = minutes || 1;
    return `${m} minute${m > 1 ? "s" : ""} ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
