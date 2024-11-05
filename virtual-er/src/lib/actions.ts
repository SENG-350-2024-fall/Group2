"use server"

import { User } from "next-auth";
import { UserData } from "./types";

async function getUsers(): Promise<UserData[]> {
    const response = await fetch(`${process.env.JSON_DB_URL}/users`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export async function getUserFromDb(email: unknown, pwHash: string | null): Promise<User | null> {
    if (typeof email !== "string" || pwHash === null) return null

    const users = await getUsers()

    for (const user of users) {
        if (user.email === email && user.pwHash === pwHash) {
            return user
        }
    }

    return null
}

export async function getRole(email: string) {
    const users = await getUsers()

    for (const user of users) {
        if (user.email === email) {
            return user.role
        }
    }

    return ""
}