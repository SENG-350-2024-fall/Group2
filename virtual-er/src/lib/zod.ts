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

export const questionnaireSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  dob: z.string({ required_error: "Date of birth is required" }).date("Invalid date of birth"),
  phn: z.number({ required_error: "PHN is required" }),
  email: z.string({ required_error: "Email is required" }).email("Invalid email"),
  symptoms: z.string({ required_error: "Symptoms are required" }),
  medicalHistory: z.string({ required_error: "Medical history is required" })
})