import { getRole } from "@/lib/actions";

export default async function RoleMessage() {
    const role = await getRole();

    return (
        <span className="text-sm text-gray-600">
            <p>Signed in as <span className="capitalize">{role}</span></p>
        </span>
    )
}