'use client'

import { useEffect, useState } from "react";
import { ER } from "../../../../interfaces";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

export default function AdminERs() {
    const [ERs, setERs] = useState<ER[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
    );
}