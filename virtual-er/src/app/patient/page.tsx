import Header from "@/components/ui/header";
import AppointmentManager from "@/components/ui/patient/appointmentManager";
import NearbyERs from "@/components/ui/patient/nearbyERs";
import PatientQuestionnaire from "@/components/ui/patient/PatientQuestionaire";
import { protectPageForRole } from "@/lib/actions";

export default async function PatientPage() {
  await protectPageForRole("patient");

  return (
    <div className="relative min-h-screen p-6">
      <Header />

      < div className="mt-10" >
        <h2 className="text-xl font-bold">Nearby Emergency Rooms</h2>
        <NearbyERs />
      </div>

      {/* Medical Questionnaire */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">Patient Questionnaire</h2>
        <PatientQuestionnaire />
      </div>

      {/* Schedule an Appointment */}
      <AppointmentManager />
    </div>
  );
}