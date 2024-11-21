import ERRequestsQueue from "@/components/hcp/erRequestsQueue";
import PatientQueue from "@/components/hcp/patientQueue";
import PatientQuestionnaire from "@/components/patient/PatientQuestionaire";
import Header from "@/components/ui/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRole, protectPageForRoleList } from "@/lib/actions";

export default async function Page() {
  await protectPageForRoleList("doctor", "nurse", "receptionist");
  const role = await getRole();
  const erID = "1"; // Hardcoded for now

  return (
    <div className="relative min-h-screen"> {/* Ensure the container takes full height */}
      <Header ERName=" - Royal Jubilee" />
      <Tabs defaultValue="patient-queue">
        <TabsList className="m-4">
          <TabsTrigger value="patient-queue">Patient Queue</TabsTrigger>
          <TabsTrigger value="request-queue">Request Queue</TabsTrigger>
        </TabsList>
        <TabsContent value="patient-queue"><PatientQueue erID={erID} /></TabsContent>
        <TabsContent value="request-queue"><ERRequestsQueue erID={erID} /></TabsContent>
      </Tabs>
      {role === 'receptionist' && (<PatientQuestionnaire erID={erID} />)}
    </div>
  );
}