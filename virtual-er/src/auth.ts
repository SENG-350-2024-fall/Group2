import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/lib/utils"
import { ZodError } from "zod"
import { getUserFromDb } from "./lib/actions"
import { credentialsSchema } from "./lib/zod"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null
  
          const { email, password } = await credentialsSchema.parseAsync(credentials)
   
          // logic to salt and hash password
          const pwHash = saltAndHashPassword(password)
   
          // logic to verify if the user exists
          user = await getUserFromDb(email, pwHash)
   
          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.")
          }
   
          // return user object with their profile data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // This error is thrown by Zod when the credentials are invalid
            return null
          }

          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login"
  }
})