"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useERRequests } from "@/lib/data";
import TriagePatientDialog from "./admitPatientForm";
import PatientDetailsDialog from "./patientDetailsDialog";

interface ERRequestsQueueProps {
    erID: string;
}

export default function ERRequestsQueue({ erID }: ERRequestsQueueProps) {
    const { erRequests, isLoading } = useERRequests(erID);

    if (isLoading) {
        return (
            <div className="mt-10 w-2/3 pl-10">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="m-4 w-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Symptoms</TableHead>
                        <TableHead>Medical History</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Triage</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {erRequests.map((erRequest, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{erRequest.name}</TableCell>
                            <TableCell>{erRequest.symptoms}</TableCell>
                            <TableCell>{erRequest.medicalHistory}</TableCell>
                            <TableCell><PatientDetailsDialog patient={erRequest} /></TableCell>
                            <TableCell><TriagePatientDialog erRequestData={erRequest} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}