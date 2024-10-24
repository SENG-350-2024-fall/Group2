import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User } from "next-auth"
import { UserData } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saltAndHashPassword(password: unknown): string | null {
  if (typeof password !== "string") return null

  // This is a placeholder for logic to salt and hash a password
  return password
}

export async function getUserFromDb(email: unknown, pwHash: string | null): Promise<User | null> {
  if (typeof email !== "string" || pwHash === null) return null

  // This is a placeholder for logic to get a user from a database
  const users: Array<UserData> = [
    {
      id: "1",
      email: "admin@mail.com",
      pwHash: "admin",
      name: "Admin",
      role: "admin"
    },
    {
      id: "2",
      email: "patient@mail.com",
      pwHash: "patient",
      name: "Patient",
      role: "patient"
    },
    {
      id: "3",
      email: "doctor@mail.com",
      pwHash: "doctor",
      name: "Doctor",
      role: "doctor"
    },
    {
      id: "4",
      email: "nurse@mail.com",
      pwHash: "nurse",
      name: "Nurse",
      role: "nurse"
    },
    {
      id: "5",
      email: "receptionist@mail.com",
      pwHash: "receptionist",
      name: "Receptionist",
      role: "receptionist"
    }
  ]

  for (const user of users) {
    if (user.email === email && user.pwHash === pwHash) {
      return user
    }
  }

  return null
}