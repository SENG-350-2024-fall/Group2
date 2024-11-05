"use server"

import { signIn } from "@/auth";
import { getRoleFromEmail } from "@/lib/actions";
import { credentialsSchema } from "@/lib/zod";
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