import AdminDialog from "@/components/admin/AddERDialog";
import AddUserDialog from "@/components/admin/AddUserDialog";
import BackupRestore from "@/components/admin/backupRestore";
import AdminERs from "@/components/admin/ers";
import AdminUsers from "@/components/admin/users";
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

          <AddUserDialog></AddUserDialog>
        </div>

        <div className="p-6">
          <p className="text-lg">Emergency Rooms</p>

          <AdminERs />

          <AdminDialog add="ER"></AdminDialog>
        </div>

        <BackupRestore />
      </div>
    </div>
  )
}