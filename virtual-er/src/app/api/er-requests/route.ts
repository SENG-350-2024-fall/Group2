import { checkRoleList } from "@/lib/actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    if (!await checkRoleList("doctor", "nurse", "receptionist")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const erID = request.nextUrl.searchParams.get("erID");

    const response = await fetch(`${process.env.JSON_DB_URL}/er-requests?erID=${erID}`);

    if (!response.ok) {
        return new Response("Failed to fetch ER requests", { status: 500 });
    }

    return new Response(JSON.stringify(await response.json()), { status: 200 });
}