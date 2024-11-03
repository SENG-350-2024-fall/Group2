import type { NextApiRequest, NextApiResponse } from "next";
import type { ER } from "../../interfaces";


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

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ER[]>,
) {
  try {
    res.status(200).json(await getERs());
  } catch(e) {
    console.error(e)
    res.status(400)
    return {
        error: e
    }
  }
}