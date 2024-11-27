"use client"

import PatientDetailsDialog from "@/components/hcp/patientDetailsDialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePatients } from "@/lib/data";
import { deletePatientFromQueue, updatePatientSOI } from "@/lib/server-actions";
import { SOI } from "@/lib/zod";

export enum severityRank {
    Extreme = 1,
    Major = 2,
    Moderate = 3,
    Minor = 4,
}

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

    if (patients.length === 0) {
        return (
            <div className="mt-10 w-2/3 pl-10">
                <p>No Patients</p>
            </div>
        )
    }

    const removePatient = async (index: number) => {
        const patientToRemove = patients[index];

        const updatedPatients = patients.splice(index, 1);

        await deletePatientFromQueue(patientToRemove.id)

        mutate(updatedPatients)
    };

    const handleSeverityChange = async (patientId: string, newSeverity: string) => {
        try {
            await updatePatientSOI(patientId, newSeverity);
    
            const updatedPatients = patients
                .map((patient) =>
                    patient.id === patientId
                        ? { ...patient, severityOfIllness: newSeverity, severityRank: severityRank[SOI.parse(newSeverity)]}
                        : patient
                )
                
            mutate(updatedPatients, true); 
        } catch (error) {
            console.error("Failed to update severity of illness:", error);
        }
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
                            <TableCell>
                                    <select
                                            value={patient.severityOfIllness}
                                            onChange={(e) => handleSeverityChange(patient.id, e.target.value)}
                                            className="mt-2">
                                            <option value="Extreme">Extreme</option>
                                            <option value="Major">Major</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="Minor">Minor</option>
                                    </select>
                            </TableCell>
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