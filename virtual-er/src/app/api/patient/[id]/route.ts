import { checkRoleList } from "@/lib/actions";


export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string}> }) {
    if (!await checkRoleList("doctor", "nurse", "receptionist")) {
        return new Response(null, { status: 401 });
    }

    const id = (await params).id;

    try {
        const response = await fetch(`${process.env.JSON_DB_URL}/patients/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return new Response(null, { status: 204 });
    } catch(e) {
        console.error(e)
        return new Response(null, { status: 400 });
    }
}