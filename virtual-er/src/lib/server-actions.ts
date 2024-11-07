"use server"

import { signIn } from "@/auth";
import { ER } from "@/lib//interfaces";
import { getRoleFromEmail } from "@/lib/actions";
import { credentialsSchema } from "@/lib/zod";
import { error } from "console";
import { z } from "zod";

export async function submitLoginForm(data: z.infer<typeof credentialsSchema>) {
    const { email, password } = data;

    const role = await getRoleFromEmail(email);

    if (role === "") {
        return {error: "Invalid email"};
    }
    
    const pages: { [index: string]: string} = {
        admin: "/admin",
        patient: "/patient",
        nurse: "/healthcareprofessional",
        doctor: "/healthcareprofessional",
        receptionist: "/healthcareprofessional",
    }
    
    try {
        await signIn("credentials", {email, password, redirectTo: pages[role] || "/"});
        return {success: true};
    } catch (error) {
        return {error: "Invalid password"};
    }
}

export async function getERByID(id: number): Promise<ER | null> {
    const response = await fetch(`${process.env.JSON_DB_URL}/ers/${id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        return null;
    }

    const ER = await response.json();
    console.log(ER);

    return ER;
}