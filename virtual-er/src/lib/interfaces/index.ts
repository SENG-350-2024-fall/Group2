import { erRequestSchema, patientSchema } from "@/lib/zod";
import { User as AuthUser } from "next-auth";
import { z } from "zod";

export type UserData = AuthUser & {
    pwHash: string
    role: string
    erID?: string
}

export type User = {
    id: number;
    name?: string;
};

export type ER = {
    id: string;
    name: string;
    capacity?: number;
    waitTime?: number;
};

export function isPatient(patient: z.infer<typeof patientSchema> | z.infer<typeof erRequestSchema>): patient is z.infer<typeof patientSchema> {
    return (patient as z.infer<typeof patientSchema>).severityOfIllness !== undefined;
}