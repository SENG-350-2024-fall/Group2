import type { NextApiRequest, NextApiResponse } from "next";
import type { Patient } from "../../interfaces";

// Fake patient data
const patients: Patient[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Patient[]>,
) {
  // Get data from your database
  res.status(200).json(patients);
}