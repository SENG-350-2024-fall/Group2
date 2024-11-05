import { auth } from "@/auth";
import { getRole } from "@/lib/actions";

export default async function RoleMessage() {
    const role = await getRole();
    let message = "";

    if (role === "admin") {
        message = "Signed in as Admin";
    } else if (role === "patient") {
        message = "Signed in as Patient";
    } else if (role === "doctor") {
        message = "Signed in as Doctor";
    } else if (role === "nurse") {
        message = "Signed in as Nurse";
    } else if (role === "receptionist") {
        message = "Signed in as Receptionist";
    }

    return (
        <span className="text-sm text-gray-600">
            {message}
        </span>
    )
}