import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { isPatient } from "@/lib/interfaces";
import { erRequestSchema, patientSchema } from "@/lib/zod";
import { z } from "zod";

interface CurrentPatientDialogProps {
    patient: z.infer<typeof patientSchema> | z.infer<typeof erRequestSchema>;
}

export default function PatientDetailsDialog({ patient }: CurrentPatientDialogProps) {
    function patientInformation(patient: z.infer<typeof patientSchema> | z.infer<typeof erRequestSchema>) {
        return (
            <div>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Date of Birth:</strong> {patient.dob}</p>
                <p><strong>PHN:</strong> {patient.phn}</p>
                {isPatient(patient) && <p><strong>Severity of Illness:</strong> {patient.severityOfIllness}</p>}
                <p><strong>Symptoms:</strong> {patient.symptoms}</p>
                <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
                {isPatient(patient) && <p><strong>Relevant Information:</strong> {patient.relevantInformation}</p>}
                {isPatient(patient) && <p><strong>Room Number:</strong> {patient.roomNumber}</p>}
            </div>
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    View Patient Information
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Patient Information</DialogTitle>
                    <DialogDescription>{isPatient(patient) ? "Admitted patient" : "Not yet admitted"}</DialogDescription>
                </DialogHeader>
                {patientInformation(patient)}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}