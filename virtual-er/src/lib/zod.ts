import { getERByID } from "@/lib/server-actions"
import { z } from "zod"

const emailField = z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")

const passwordField = z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")

export const credentialsSchema = z.object({
    email: emailField,
    password: passwordField
})

export const SOI = z.enum(["Extreme", "Major", "Moderate", "Minor"])

export const erRequestSchema = z.object({
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
    soi: SOI.optional(),
    date: z.number().optional(),
})