import Header from "@/components/ui/header";

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

  import type { User } from "../../../interfaces";

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



export default async function Page() {

  let data = await fetch(`${process.env.PUBLIC_APP_URL}/api/users`)
  let users = await data.json()
  console.log(users)

    return (
      <div className="relative min-h-screen"> {/* Added padding to the container */}
        <Header title="Admin Dashboard" />
        <div className="p-6"> {/* Added padding to the container */}
                <p className="text-2xl">Admin Dashboard</p>

                <div className="p-6">
                    <p className="text-lg">Users</p>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">User</TableHead>
                            <TableHead>Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user: User) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Button>Add User</Button>
                </div>

                <div className="p-6">
                    <p className="text-lg">Emergency Rooms</p>

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

                    <Button>Add ER</Button>
                </div>
          </div>
        </div>
    )
}