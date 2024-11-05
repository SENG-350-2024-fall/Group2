import { auth } from "@/auth";
import { getRole } from "@/lib/actions";

export default async function RoleMessage() {
    const session = await auth();
    let message = "";

    if (session?.user?.email) {
        const role = await getRole(session.user.email);

        if (role === "admin") {
            message = "Signed in as Admin";
        } else if (role === "hcp") {
            message = "Signed in as Healthcare Professional";
        } else if (role === "patient") {
            message = "Signed in as Patient";
        }
    }

    return (
        <span className="text-sm text-gray-600">
            {message}
        </span>
    )
}