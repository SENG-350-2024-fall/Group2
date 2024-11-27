"use client"

import TriagePatientDialog from "@/components/hcp/admitPatientForm";
import PatientDetailsDialog from "@/components/hcp/patientDetailsDialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useERRequests } from "@/lib/data";
import { deleteERRequest } from "@/lib/server-actions";

interface ERRequestsQueueProps {
    erID: string;
}

export default function ERRequestsQueue({ erID }: ERRequestsQueueProps) {
    const { erRequests, isLoading, mutate } = useERRequests(erID);

    if (isLoading) {
        return (
            <div className="mt-10 w-2/3 pl-10">
                <p>Loading...</p>
            </div>
        )
    }

    if (erRequests.length === 0) {
        return (
            <div className="mt-10 w-2/3 pl-10">
                <p>No ER Requests</p>
            </div>
        )
    }

    const removeRequest = async (index: number) => {
        const requestToRemove = erRequests[index];

        const updatedRequests = erRequests.splice(index, 1);

        await deleteERRequest(requestToRemove.id)

        mutate(updatedRequests)
    };

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
                        <TableHead>Remove Request</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {erRequests.map((erRequest, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {erRequest.name}
                            </TableCell>
                            <TableCell>{erRequest.symptoms}</TableCell>
                            <TableCell>{erRequest.medicalHistory}</TableCell>
                            <TableCell>
                                <PatientDetailsDialog patient={erRequest} />
                            </TableCell>
                            <TableCell>
                                <TriagePatientDialog erRequestData={erRequest} />
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => removeRequest(index)}>Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}