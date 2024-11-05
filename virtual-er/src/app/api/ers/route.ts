import { checkRole } from "@/lib/actions";
import type { ER } from "@/lib/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

async function getERs(): Promise<ER[]> {
    const response = await fetch(`${process.env.JSON_DB_URL}/ers`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    //    And can also be used here ↴
    return await response.json() as ER[];
}

export async function GET() {
  try {
    return new Response(JSON.stringify(await getERs()), { status: 200 });
  } catch(e) {
    console.error(e)
    return new Response(null, { status: 400 });
  }
}