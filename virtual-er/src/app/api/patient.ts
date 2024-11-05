import { checkRoleList } from "@/lib/actions";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Patient } from "../../../interfaces";


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

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Patient[]>,
) {
  if (!await checkRoleList("doctor", "nurse", "receptionist")) {
    res.status(401);
  }

  try {
    console.log(_req.body);
    res.status(200).json(await getPatients());
  } catch(e) {
    console.error(e)
    res.status(400)
    return {
        error: e
    }
  }
}