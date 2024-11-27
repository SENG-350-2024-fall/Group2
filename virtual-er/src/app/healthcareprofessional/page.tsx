import ERRequestsQueue from "@/components/hcp/erRequestsQueue";
import PatientQueue from "@/components/hcp/patientQueue";
import PatientQuestionnaire from "@/components/patient/PatientQuestionaire";
import Header from "@/components/ui/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getER, getRole, protectPageForRoleList } from "@/lib/actions";

export default async function Page() {
    await protectPageForRoleList("doctor", "nurse", "receptionist");
    const role = await getRole();
    const er = await getER();

    if (!er) {
        return <div>ER not found</div>;
    }

    return (
        <div className="relative min-h-screen">
            <Header ERName={` - ${er.name}`} />
            <Tabs defaultValue="patient-queue">
                <div className="flex m-4 space-x-4">
                    <TabsList>
                        <TabsTrigger value="patient-queue">Patient Queue</TabsTrigger>
                        <TabsTrigger value="request-queue">Request Queue</TabsTrigger>
                    </TabsList>
                    {role === 'receptionist' && (<PatientQuestionnaire erID={er.id} />)}
                </div>
                <TabsContent value="patient-queue"><PatientQueue erID={er.id} /></TabsContent>
                <TabsContent value="request-queue"><ERRequestsQueue erID={er.id} /></TabsContent>
            </Tabs>
        </div>
    );
}