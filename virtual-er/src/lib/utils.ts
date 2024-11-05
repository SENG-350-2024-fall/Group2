import { clsx, type ClassValue } from "clsx"
import { User } from "next-auth"
import { twMerge } from "tailwind-merge"
import { UserData } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saltAndHashPassword(password: unknown): string | null {
  if (typeof password !== "string") return null

  // This is a placeholder for logic to salt and hash a password
  return password
}