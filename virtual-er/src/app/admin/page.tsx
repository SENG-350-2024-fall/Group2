import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  const users = [
    {
      user: "Raf",
      status: "Healthy",
      ER: "Royal Jubilee",
    },
    {
      user: "Matt",
      status: "Sick",
      ER: "North Quadra Urgent Care",
    },
    {
      user: "Sam",
      status: "Critical",
      ER: "Victoria General",
    },

  ]

export default function Page() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 sm:p-20">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-2xl">Admin Dashboard</h1>

                <Button>Add User</Button>

                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Closest ER</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                        <TableRow key={user.user}>
                            <TableCell className="font-medium">{user.user}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>{user.ER}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>

            
            </main>
        </div>
    )
}