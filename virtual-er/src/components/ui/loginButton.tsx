"use client"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"

export default function LoginButton() {
    const { data: session } = useSession()

    return (
        <Button
            onClick={session ? () => signOut() : () => { }}
            variant="outline"
        >{session ? "Sign Out" : "Sign In"}</Button>
    )
}