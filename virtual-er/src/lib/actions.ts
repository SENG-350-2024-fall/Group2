import { auth } from "@/auth";
import type { ER, UserData } from "@/lib/interfaces";
import { redirect, RedirectType } from "next/navigation";

async function getUserByEmail(email: string): Promise<UserData | null> {
    const response = await fetch(`${process.env.JSON_DB_URL}/credentials?email=${email}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    if (data.length === 0) {
        return null;
    }

    return data[0];
}

async function getERByID(erID: string): Promise<ER | null> {
    const response = await fetch(`${process.env.JSON_DB_URL}/ers?id=${erID}`)

    if (!response.ok) {
        return null;
    }

    const data: ER[] = await response.json()

    if (data.length === 0) {
        return null;
    }

    return data[0]
}

export async function getUserFromDb(email: unknown, pwHash: string | null): Promise<UserData | null> {
    if (typeof email !== "string" || pwHash === null) return null

    const user = await getUserByEmail(email)

    if (user === null) {
        return null
    }

    if (user.pwHash === pwHash) {
        return user;
    }

    return null
}

export async function getER(): Promise<ER | null> {
    const session = await auth()
    if (!session?.user?.email) {
        return null
    }

    const email = session.user.email

    const user = await getUserByEmail(email)

    if (user?.erID === undefined) {
        return null
    }

    return await getERByID(user.erID)
}

export async function getRoleFromEmail(email: string): Promise<string> {
    const user = await getUserByEmail(email);

    return user?.role || ""
}

export async function getRole() {
    const session = await auth()
    if (!session?.user?.email) {
        return ""
    }

    const email = session.user.email

    const user = await getUserByEmail(email)

    return user?.role || ""
}

export async function checkRole(role: string) {
    return await getRole() === role
}

export async function checkRoleList(...roles: string[]) {
    return roles.includes(await getRole())
}

export async function protectPageForRole(role: string) {
    if (await getRole() !== role) {
        redirect("/login", RedirectType.replace);
    }
}

export async function protectPageForRoleList(...roles: string[]) {
    const userRole = await getRole();
    if (!roles.includes(userRole)) {
        redirect("/login", RedirectType.replace);
    }
}