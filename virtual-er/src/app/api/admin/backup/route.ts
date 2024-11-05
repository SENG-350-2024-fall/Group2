import { checkRole } from "@/lib/actions";
import { backup } from "@/lib/admin/backup";

export async function GET() {
    if (!await checkRole("admin")) {
        return new Response(null, { status: 401 });
    }

    backup();

    return new Response(null, { status: 200 });
}