import AdminDialog from "@/components/ui/admin/AdminDialog";
import AdminERs from "@/components/ui/admin/ers";
import AdminUsers from "@/components/ui/admin/users";
import Header from "@/components/ui/header";
import { protectPageForRole } from "@/lib/actions";

export default async function Page() {
  await protectPageForRole("admin");

  return (
    <div className="relative min-h-screen"> {/* Added padding to the container */}
      <Header />
      <div className="p-6"> {/* Added padding to the container */}
        <p className="text-2xl">Admin Dashboard</p>

        <div className="p-6">
          <p className="text-lg">Users</p>

          <AdminUsers />

          <AdminDialog add="User"></AdminDialog>
        </div>

        <div className="p-6">
          <p className="text-lg">Emergency Rooms</p>

          <AdminERs />

          <AdminDialog add="ER"></AdminDialog>
        </div>
      </div>
    </div>
  )
}