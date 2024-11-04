"use client"; // Add this directive at the top of the file

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

import { AdminDialog } from "./AdminDialog";

import type { User, ER } from "../../../interfaces";
import React, { useEffect } from "react";



export default function Page() {

  const [Users, setUsers] = React.useState<User[]>([]);
  const [ERs, setERs] = React.useState<ER[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResult = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`);
        let UserList = await userResult.json()
        setUsers(UserList);

        const ERResult = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ers`);
        let ERList = await ERResult.json()
        setERs(ERList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  });

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
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Users.map((user: User) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <AdminDialog add="User"></AdminDialog>
                </div>

                <div className="p-6">
                    <p className="text-lg">Emergency Rooms</p>

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Capacity</TableHead>
                            <TableHead>Wait Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ERs.map((emergencyRoom: ER) => (
                            <TableRow key={emergencyRoom.id}>
                                <TableCell className="font-medium">{emergencyRoom.id}</TableCell>
                                <TableCell>{emergencyRoom.name}</TableCell>
                                <TableCell>{emergencyRoom.capacity}</TableCell>
                                <TableCell>{emergencyRoom.waitTime}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <AdminDialog add="ER"></AdminDialog>
                </div>
          </div>
        </div>
    )
}