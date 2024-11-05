'use client'

import { useEffect, useState } from "react";
import { User } from "../../../../interfaces";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

export default function AdminUsers() {
    const [Users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResult = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`);
                let UserList = await userResult.json()
                setUsers(UserList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    });

    return (
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
    )
}