"use server"

import { signIn } from "@/auth";
import { checkRoleList, getRoleFromEmail } from "@/lib/actions";
import type { ER } from "@/lib/interfaces";
import { credentialsSchema, erRequestFormSchema, erRequestSchema, patientSchema, SOI, triageFormSchema } from "@/lib/zod";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function calculateWaitTimeByER(erID: string) {
    try {
        // Fetch the ER by ID to get the ER's name and other relevant data
        const erResponse = await fetch(`${process.env.JSON_DB_URL}/ers/${erID}`);
        if (!erResponse.ok) {
            throw new Error(`Failed to fetch ER with ID: ${erID}`);
        }

        const erData = await erResponse.json();
        const erName = erData.name;  // Preserve the ER name and other data
        let totalWaitTime = 0; // Start wait time from zero

        // Fetch the patients currently in this ER
        const patientsResponse = await fetch(`${process.env.JSON_DB_URL}/patients?erID=${erID}`);
        if (!patientsResponse.ok) {
            throw new Error(`Failed to fetch patients for ER with ID: ${erID}`);
        }

        const patients = await patientsResponse.json();

        // Define additional wait time based on severity
        const severityWaitTime: { [key: string]: number } = {
            "Extreme": 5,
            "Major": 3,
            "Moderate": 2,
            "Minor": 1,
        };

        // Calculate the total wait time by adding up the times for each patient's severity
        patients.forEach((patient: any) => {
            const additionalWaitTime = severityWaitTime[patient.severityOfIllness] || 0;
            totalWaitTime += additionalWaitTime;
        });

        // Update the ER data with the new calculated wait time
        const updatedERData = {
            ...erData, // Preserve other ER data (like name, etc.)
            waitTime: totalWaitTime, // New calculated wait time based on patients
        };

        // Update the ER record in the database with the new wait time
        const updateERResponse = await fetch(`${process.env.JSON_DB_URL}/ers/${erID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedERData),
        });

        if (!updateERResponse.ok) {
            console.error(`Failed to update ER wait time for ER ID: ${erID}`);
            throw new Error("Failed to update ER wait time");
        }

        return updatedERData; // Return the updated ER data with the new wait time
    } catch (error) {
        console.error("Error calculating wait time by ER:", error);
    }
}

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
    calculateWaitTimeByER(patient.erID);
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

export async function deletePatientFromQueue(id: string, erID: string) {
    try {
        const response = await fetch(`${process.env.JSON_DB_URL}/patients/${id}`, {
            method: "delete"
        })
        calculateWaitTimeByER(erID);
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
export async function updatePatientSOI(patientId: string, newSeverity: string) {
    try {
        // Fetch the existing patient data
        const fetchResponse = await fetch(`${process.env.JSON_DB_URL}/patients/${patientId}`);
        if (!fetchResponse.ok) {
            console.error("Failed to fetch patient data:", fetchResponse.status);
            throw new Error("Failed to fetch patient data");
        }

        const patientData = await fetchResponse.json();

        // Update only the severityOfIllness field while keeping other fields intact
        const updatedPatientData = {
            ...patientData,
            severityOfIllness: newSeverity,
            severityRank: severityRank(SOI.parse(newSeverity)),
        };

        // Send the updated data back to the server
        const updateResponse = await fetch(`${process.env.JSON_DB_URL}/patients/${patientId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPatientData),
        });
        calculateWaitTimeByER(patientData.erID);
        if (!updateResponse.ok) {
            console.error("Response Status:", updateResponse.status);
            throw new Error(updateResponse.statusText);
        }
    } catch (error) {
        console.error(`Failed to update patient SOI for ID: ${patientId}`, error);
    }
}
