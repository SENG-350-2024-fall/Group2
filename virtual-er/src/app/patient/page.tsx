import Header from "@/components/ui/header";
import AppointmentManager from "@/components/ui/patient/appointmentManager";
import NearbyERs from "@/components/ui/patient/nearbyERs";
import PatientQuestionnaire from "@/components/ui/patient/PatientQuestionaire"; // Import the questionnaire component
import { checkRole } from "@/lib/actions";
import * as React from "react";

export default async function PatientPage() {
  await checkRole("patient");

  return (
    <div className="relative min-h-screen p-6"> {/* Added padding to the container */}
      <Header />

      < div className="mt-10" >
        <h2 className="text-xl font-bold">Nearby Emergency Rooms</h2>
        <NearbyERs /> {/* Render the NearbyERs component */}
      </div >

      {/* Medical Questionnaire */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">Patient Questionnaire</h2>
        <PatientQuestionnaire /> {/* Render the PatientQuestionnaire component */}
      </div>

      <AppointmentManager /> {/* Render the AppointmentManager component */}
    </div>
  );
}
