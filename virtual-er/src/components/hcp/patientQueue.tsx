"use client"

import PatientDetailsDialog from "@/components/hcp/patientDetailsDialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePatients } from "@/lib/data";
import { deletePatientFromQueue } from "@/lib/server-actions";

interface PatientQueueProps {
    erID: string;
}

export default function PatientQueue({ erID }: PatientQueueProps) {
    const { patients, isLoading, mutate } = usePatients(erID);

    if (isLoading) {
        return (
            <div className="mt-10 w-2/3 pl-10">
                <p>Loading...</p>
            </div>
        )
    }
    /*
        This function becomes more complicated as a result of updating the indexes correctly.
        It removes the patient that had their remove button clicked.
    */
    const removePatient = async (index: number) => {
        const patientToRemove = patients[index];

        const updatedPatients = patients.splice(index, 1);

        await deletePatientFromQueue(patientToRemove.id!)

        mutate(updatedPatients)
    };

    return (
        <div className="m-4 w-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Severity of Illness</TableHead>
                        <TableHead>Relevant Information</TableHead>
                        <TableHead>Position in Queue</TableHead>
                        <TableHead>Room Number</TableHead>
                        <TableHead>Patient Details</TableHead>
                        <TableHead>Remove Patient</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map((patient, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.severityOfIllness}</TableCell>
                            <TableCell>{patient.relevantInformation}</TableCell>
                            <TableCell>{index === 0 ? "0 (Current Patient)" : index}</TableCell>
                            <TableCell>{patient.roomNumber ?? ""}</TableCell>
                            <TableCell>
                                <PatientDetailsDialog patient={patient} />
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => removePatient(index)}>Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}