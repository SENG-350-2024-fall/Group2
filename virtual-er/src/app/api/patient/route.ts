import { checkRoleList } from "@/lib/actions";
import type { Patient } from "@/lib/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

async function getPatients(): Promise<Patient[]> {
    const response = await fetch(`${process.env.JSON_DB_URL}/patients`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    //    And can also be used here ↴
    return await response.json() as Patient[];
}

export async function GET() {
  if (!await checkRoleList("doctor", "nurse", "receptionist")) {
    return new Response(null, { status: 401 });
  }

  try {
    return new Response(JSON.stringify(await getPatients()), { status: 200 });
  } catch(e) {
    console.error(e)
    return new Response(null, { status: 400 });
  }
}