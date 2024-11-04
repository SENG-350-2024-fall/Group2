import type { NextApiRequest, NextApiResponse } from "next";
import type { ER } from "../../interfaces";


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

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ER>,
) {
  try {
    await postER(_req.body);
    res.status(200);
  } catch(e) {
    console.error(e)
    res.status(400)
    return {
        error: e
    }
  }
}