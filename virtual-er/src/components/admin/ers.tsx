'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useERs } from "@/lib/data";

export default function AdminERs() {
    const { ers: ERs, isLoading } = useERs();

    if (isLoading) {
        return <div>Loading ERs...</div>;
    }

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
                {ERs.map((emergencyRoom) => (
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