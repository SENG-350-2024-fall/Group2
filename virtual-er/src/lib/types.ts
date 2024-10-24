import { User } from "next-auth";

export interface UserData extends User {
    pwHash: string
    role: string
}