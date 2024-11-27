'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUsers } from "@/lib/data";
import type { UserData } from "@/lib/interfaces";

export default function AdminUsers() {
    const { users: Users, isLoading } = useUsers();

    if (isLoading) {
        return <div>Loading Users...</div>;
    } else {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Users.map((user: UserData) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
    }
}