"use server"

import { signIn } from "@/auth";
import { checkRoleList, getRoleFromEmail } from "@/lib/actions";
import type { ER, UserData } from "@/lib/interfaces";
import { adminAddUserSchema, credentialsSchema, erRequestFormSchema, erRequestSchema, patientSchema, SOI, triageFormSchema } from "@/lib/zod";
import { redirect } from "next/navigation";
import { z } from "zod";
import { numUsers } from "./data";

export async function submitLoginForm(data: z.infer<typeof credentialsSchema>) {
    const { email, password } = data;

    const role = await getRoleFromEmail(email);

    if (role === "") {
        return { error: "Invalid email" };
    }

    const pages: { [index: string]: string } = {
        admin: "/admin",
        patient: "/patient",
        nurse: "/healthcareprofessional",
        doctor: "/healthcareprofessional",
        receptionist: "/healthcareprofessional",
    }

    try {
        await signIn("credentials", { email, password, redirect: false });
    } catch (error) {
        return { error: "Invalid password" };
    }

    redirect(pages[role] || "/");
}

export async function getERByID(id: string): Promise<ER | null> {
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

export async function submitQuestionnaire(data: z.infer<typeof erRequestFormSchema>) {
    const response = await fetch(`${process.env.JSON_DB_URL}/er-requests`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, requestDate: Date.now() })
    });

    if (!response.ok) {
        return { error: "Failed to submit questionnaire" };
    }

    return { success: true };
}

function severityRank(severity: z.infer<typeof SOI>) {
    switch (severity) {
        case "Extreme":
            return 1;
        case "Major":
            return 2;
        case "Moderate":
            return 3;
        case "Minor":
            return 4;
    }
}

export async function submitTriagePatient(triageData: z.infer<typeof triageFormSchema>, requestData: z.infer<typeof erRequestSchema>) {
    if (!await checkRoleList("doctor", "nurse", "receptionist")) {
        return { error: "Unauthorized" };
    }

    const data: z.infer<typeof patientSchema> = { ...triageData, ...requestData, severityRank: severityRank(triageData.severityOfIllness) }

    const postResponse = await fetch(`${process.env.JSON_DB_URL}/patients`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const patient = await postResponse.json();
    console.log(patient);

    if (!postResponse.ok) {
        return { error: "Failed to submit triage" };
    }

    const deleteResponse = await fetch(`${process.env.JSON_DB_URL}/er-requests/${requestData.id}`, {
        method: "delete"
    })

    if (!deleteResponse.ok) {
        return { error: "Failed to delete ER request" };
    }

    return { success: true };
}

export async function deletePatientFromQueue(id: string) {
    try {
        const response = await fetch(`${process.env.JSON_DB_URL}/patients/${id}`, {
            method: "delete"
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteERRequest(id: string) {
    try {
        const response = await fetch(`${process.env.JSON_DB_URL}/er-requests/${id}`, {
            method: "delete"
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function adminAddUser(data: z.infer<typeof adminAddUserSchema>) {
    const UsersResponse = await fetch(`${process.env.JSON_DB_URL}/credentials`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }});
        if (!UsersResponse.ok) {
            return null;
        }
    
    const currentNumUsers: UserData[] = await UsersResponse.json();
    const newUserID = currentNumUsers.length + 1;

    const response = await fetch(`${process.env.JSON_DB_URL}/credentials`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, id: newUserID})
    });

    if (!response.ok) {
        return { error: "Failed to add user" };
    }

    return { success: true };
}