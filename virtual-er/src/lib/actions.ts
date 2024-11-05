import { auth } from "@/auth";
import { User } from "next-auth";
import { redirect, RedirectType } from "next/navigation";
import { UserData } from "./types";

async function getUsers(): Promise<UserData[]> {
    const response = await fetch(`${process.env.JSON_DB_URL}/credentials`, {
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

export async function getRole() {
    const session = await auth();
    if (!session?.user?.email) {
        return ""
    }

    const email = session.user.email

    const users = await getUsers()

    for (const user of users) {
        if (user.email === email) {
            return user.role
        }
    }

    return ""
}

export async function checkRole(role: string) {
    if (await getRole() !== role) {
        redirect("/login", RedirectType.replace);
    }
}

export async function checkRoleList(...roles: string[]) {
    const userRole = await getRole();
    if (!roles.includes(userRole)) {
        redirect("/login", RedirectType.replace);
    }
}