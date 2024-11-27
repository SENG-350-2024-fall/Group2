import { checkRole } from "@/lib/actions";
import type { UserData } from "@/lib/interfaces";

async function getUsers(): Promise<UserData[]> {
    const response = await fetch(`${process.env.JSON_DB_URL}/credentials`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as UserData[];
}

export async function GET() {
  if (!await checkRole("admin")) {
    return new Response(null, { status: 401 });
  }
  
  try {
    return new Response(JSON.stringify(await getUsers()), { status: 200 });
  } catch(e) {
    console.error(e)
    return new Response(null, { status: 400 });
  }
}