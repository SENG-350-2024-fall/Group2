import { checkRole } from "@/lib/actions";
import type { ER } from "@/lib/interfaces";
import { NextRequest } from "next/server";

async function postER(PostObject: ER) {
    const response = await fetch(`${process.env.JSON_DB_URL}/ers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(PostObject)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
}

export async function POST(request: NextRequest) {
  if (!await checkRole("admin")) {
    return new Response(null, { status: 401 });
  }

  try {
    await postER(await request.json());
    return new Response(null, { status: 200 });
  } catch(e) {
    console.error(e)
    return new Response(null, { status: 400 });
  }
}