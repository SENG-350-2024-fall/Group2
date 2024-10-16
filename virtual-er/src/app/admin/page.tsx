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

  const emergencyRooms = [
    {
      ER: "Royal Jubilee",
      address: "2990 Bay St.",
      capacity: 130,
    },
    {
      ER: "North Quadra Urgent Care",
      address: "1009 Quadra",
      capacity: 5,
    },
    {
      ER: "Victoria General",
      address: "800 Highway",
      capacity: 200,
    },

  ]

export default function Page() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 sm:p-20">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <p className="text-2xl">Admin Dashboard</p>

                <div>
                    <p className="text-lg">Users</p>
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
                </div>

                <div>
                    <p className="text-lg">Emergency Rooms</p>
                    <Button>Add ER</Button>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">ER</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Capacity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {emergencyRooms.map((emergencyRoom) => (
                            <TableRow key={emergencyRoom.ER}>
                                <TableCell className="font-medium">{emergencyRoom.ER}</TableCell>
                                <TableCell>{emergencyRoom.address}</TableCell>
                                <TableCell>{emergencyRoom.capacity}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>


            
            </main>
        </div>
    )
}