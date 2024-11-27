import { checkRoleList } from "@/lib/actions";
import { patientSchema } from "@/lib/zod";
import { NextRequest } from "next/server";
import { z } from "zod";

async function getPatients(erID: string): Promise<z.infer<typeof patientSchema>[]> {
    const response = await fetch(`${process.env.JSON_DB_URL}/patients?erID=${erID}&_sort=severityRank,requestDate`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
}

export async function GET(request: NextRequest) {
  if (!await checkRoleList("doctor", "nurse", "receptionist")) {
    return new Response(null, { status: 401 });
  }

  const erID = request.nextUrl.searchParams.get("erID");

  if (!erID) {
    return new Response(null, { status: 400 });
  }

  try {
    return new Response(JSON.stringify(await getPatients(erID)), { status: 200 });
  } catch(e) {
    console.error(e)
    return new Response(null, { status: 400 });
  }
}