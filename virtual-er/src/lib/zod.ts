import { getERByID } from "@/lib/server-actions"
import { z } from "zod"

export const credentialsSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters")
})

export const SOI = z.enum(["Extreme", "Major", "Moderate", "Minor"], { required_error: "Severity of Illness is required" })

export const erRequestFormSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    dob: z.string({ required_error: "Date of birth is required" })
        .date("Invalid date of birth"),
    phn: z.string({ required_error: "PHN is required" })
        .min(10, "PHN must have 10 digits")
        .max(10, "PHN must have 10 digits")
        .transform((phn, ctx) => {
            const phnNum = Number(phn)
            if (isNaN(phnNum)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.invalid_type,
                    expected: "number",
                    received: "string",
                    message: "PHN must be a number"
                })
                return phnNum
            }

            return phnNum
        }),
    email: z.string({ required_error: "Email is required" })
        .email("Invalid email"),
    symptoms: z.string({ required_error: "Symptoms are required" })
        .min(1, "Symptoms are required"),
    medicalHistory: z.string({ required_error: "Medical history is required" })
        .min(1, "Medical history is required"),
    erID: z.string({ required_error: "ER ID is required" })
        .superRefine(async (erID, ctx) => {
            const ER = await getERByID(erID)

            if (ER === null) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "ER ID does not exist"
                })
            }
        }),
})

export const erRequestSchema = erRequestFormSchema.merge(z.object({
    requestDate: z.number(),
    id: z.string()
}))

export const triageFormSchema = z.object({
    roomNumber: z.string()
        .transform((phn, ctx) => {
            const phnNum = Number(phn)
            if (isNaN(phnNum)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.invalid_type,
                    expected: "number",
                    received: "string",
                    message: "PHN must be a number"
                })
                return phnNum
            }

            return phnNum
        }).optional(),
    severityOfIllness: SOI,
    relevantInformation: z.string({ required_error: "Relevant information is required" })
})

export const patientSchema = erRequestSchema.merge(triageFormSchema).merge(z.object({
    severityRank: z.number(),
}))

export const adminAddUserSchema = z.object({
    name: z.string({ required_error: "Name is required" })
        .min(1, "Name is required"),
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    pwHash: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    role: z.string({ required_error: "Role is required" })
})