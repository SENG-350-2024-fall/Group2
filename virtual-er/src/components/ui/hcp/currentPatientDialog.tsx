import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { usePatients } from "@/lib/data";

export default function CurrentPatientDialog() {
    const { patients, isLoading } = usePatients();

    if (isLoading) {
        return null;
    }

    const currentPatient = patients[0];

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* Positioning the button at the bottom right */}
                <Button className="fixed bottom-4 right-4">
                    View Current Patient Information
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Current Patient Information</DialogTitle>
                </DialogHeader>
                <div>
                    <p><strong>Name:</strong> {currentPatient.PatientName}</p>
                    <p><strong>Severity of Illness:</strong> {currentPatient.SeverityOfIllness}</p>
                    <p><strong>Relevant Information:</strong> {currentPatient.RelevantInformation}</p>
                    <p><strong>Room Number:</strong> {currentPatient.RoomNumber}</p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="mt-4">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}