import { z } from "zod"

const emailField = z.string({ required_error: "Email is required" })
.min(1, "Email is required")
.email("Invalid email")

const passwordField = z.string({ required_error: "Password is required" })
.min(1, "Password is required")
.min(8, "Password must be more than 8 characters")
.max(32, "Password must be less than 32 characters")

export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
  user_type: z.enum(["admin", "hcp", "patient"])
})

export const credentialsSchema = z.object({
  email: emailField,
  password: passwordField
})