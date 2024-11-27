import RegisterForm from "@/components/auth/register-patient-form"
import Header from "@/components/ui/header"

export default function Page() {
    return (
        <div>
            <Header />
            <div className="grid gap-y-2 mt-6">
                <div className="m-auto font-bold">
                    <h1 className="text-2xl">
                        Register as a Patient
                    </h1>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}