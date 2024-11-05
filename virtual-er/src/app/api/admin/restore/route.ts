import { checkRole } from "@/lib/actions";
import { restore } from "@/lib/admin/backup";

export async function GET() {
    if (!await checkRole("admin")) {
        return new Response(null, { status: 401 });
    }

    restore();

    return new Response(null, { status: 200 });
}