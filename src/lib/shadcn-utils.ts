import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
