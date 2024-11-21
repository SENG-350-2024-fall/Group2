'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

export default function AppointmentManager() {
    const [appointments, setAppointments] = useState<string[]>([]);
    const [newAppointment, setNewAppointment] = useState("");

    const addAppointment = () => {
        if (newAppointment.trim()) {
            setAppointments([...appointments, newAppointment]);
            setNewAppointment("");
        }
    };

    const removeAppointment = (index: number) => {
        setAppointments((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            {/* Schedule an Appointment */}
            < div className="mt-10" >
                <h2 className="text-xl font-bold">Schedule an Appointment</h2>
                <div className="flex items-center mt-4">
                    <Input
                        placeholder="Enter appointment details"
                        value={newAppointment}
                        onChange={(e) => setNewAppointment(e.target.value)}
                        className="w-full max-w-md" // Limit the width of the input
                    />
                    <Button onClick={addAppointment} className="ml-4">
                        Schedule
                    </Button>
                </div>
            </div >

            {/* Manage Appointments */}
            < div className="mt-10" >
                <h2 className="text-xl font-bold">Manage Appointments</h2>
                {
                    appointments.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Appointment Details</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((appointment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{appointment}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => removeAppointment(index)}>
                                                Cancel
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No appointments scheduled.</p>
                    )
                }
            </div >
        </div>
    )
}