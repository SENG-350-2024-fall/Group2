import HCPDashboard from "@/components/ui/hcp/HCPDashboard";
import Header from "@/components/ui/header";
import { getRole, protectPageForRoleList } from "@/lib/actions";

export default async function Page() {
  await protectPageForRoleList("doctor", "nurse", "receptionist");
  const role = await getRole();

  return (
    <div className="relative min-h-screen"> {/* Ensure the container takes full height */}
      <Header ERName=" - Royal Jubilee" />
      <HCPDashboard role={role} />
    </div>
  );
}