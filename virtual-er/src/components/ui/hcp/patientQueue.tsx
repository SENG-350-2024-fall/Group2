import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePatients } from "@/lib/data";

export default function PatientQueue() {
    const { patients, isLoading, mutate } = usePatients();

    if (isLoading) {
        return (
            <div className="mt-10 w-2/3 pl-10">
                <p>Loading...</p>
            </div>
        )
    }

    async function deletePatientFromQueue(id: string) {
        try {
            const response = await fetch(`/api/patient/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    }
    /*
        This function becomes more complicated as a result of updating the indexes correctly.
        It removes the patient that had their remove button clicked.
    */
    const removePatient = (index: number) => {
        const patientToRemove = patients[index];

        const updatedPatients = patients.splice(index, 1);

        deletePatientFromQueue(patientToRemove.id!)
            .then(() => mutate(updatedPatients));
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
                        <TableHead>Remove Patient</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map((patient, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{patient.PatientName}</TableCell>
                            <TableCell>{patient.SeverityOfIllness}</TableCell>
                            <TableCell>{patient.RelevantInformation}</TableCell>
                            <TableCell>{index === 0 ? "0 (Current Patient)" : index}</TableCell>
                            <TableCell>{patient.RoomNumber}</TableCell>
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