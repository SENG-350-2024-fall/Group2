import { checkRole } from "@/lib/actions";
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../../interfaces";


async function getUsers(): Promise<User[]> {
    const response = await fetch(`${process.env.JSON_DB_URL}/users`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as User[];
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>,
) {
  if (!await checkRole("admin")) {
    res.status(401);
  }
  
  try {
    res.status(200).json(await getUsers());
  } catch(e) {
    console.error(e)
    res.status(400)
    return {
        error: e
    }
  }
}