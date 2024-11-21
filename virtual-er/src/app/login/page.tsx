import LoginForm from "@/components/auth/login-form"
import Header from "@/components/ui/header"

export default function Page() {
    return (
        <div>
            <Header />
            <div className="grid gap-y-2 mt-6">
                <div className="m-auto font-bold">
                    <h1 className="text-2xl">
                        Log in to VirtualER
                    </h1>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}