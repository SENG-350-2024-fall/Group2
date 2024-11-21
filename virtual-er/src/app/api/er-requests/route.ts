import { checkRoleList } from "@/lib/actions";

export async function GET() {
    if (!await checkRoleList("doctor", "nurse", "receptionist")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const response = await fetch(`${process.env.JSON_DB_URL}/er-requests`);

    if (!response.ok) {
        return new Response("Failed to fetch ER requests", { status: 500 });
    }

    return new Response(JSON.stringify(await response.json()), { status: 200 });
}