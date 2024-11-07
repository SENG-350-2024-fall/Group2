"use server"

import { signIn } from "@/auth";
import { ER } from "@/lib//interfaces";
import { getRoleFromEmail } from "@/lib/actions";
import { credentialsSchema, erRequestSchema } from "@/lib/zod";
import { z } from "zod";

export async function submitLoginForm(data: z.infer<typeof credentialsSchema>) {
    const { email, password } = data;

    const role = await getRoleFromEmail(email);
    
    const pages: { [index: string]: string} = {
        admin: "/admin",
        patient: "/patient",
        nurse: "/healthcareprofessional",
        doctor: "/healthcareprofessional",
        receptionist: "/healthcareprofessional",
    }

    await signIn("credentials", {email, password, redirectTo: pages[role] || "/"});
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