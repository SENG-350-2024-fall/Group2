import { auth } from "@/auth";
import AppointmentManager from "@/components/patient/appointmentManager";
import NearbyERs from "@/components/patient/nearbyERs";
import PatientQuestionnaire from "@/components/patient/PatientQuestionaire";
import Header from "@/components/ui/header";
import { protectPageForRole } from "@/lib/actions";

export default async function PatientPage() {
  await protectPageForRole("patient");
  const session = await auth();
  if (!session || !session.user) return null;
  const { name, email } = session.user;

  return (
    <div className="relative min-h-screen">
      <Header />

      <div className="p-6">
        < div className="mt-10" >
          <h2 className="text-xl font-bold">Nearby Emergency Rooms</h2>
          <NearbyERs />
        </div>

        {/* Medical Questionnaire */}
        <div className="mt-10">
          <h2 className="text-xl font-bold">Patient Questionnaire</h2>
          <PatientQuestionnaire name={name!} email={email!} />
        </div>

        {/* Schedule an Appointment */}
        <AppointmentManager />
      </div>
    </div>
  );
}