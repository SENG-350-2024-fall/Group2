"use client"; // Add this directive at the top of the file

import { Button } from "@/components/ui/button";
import CurrentPatientDialog from "@/components/ui/hcp/currentPatientDialog";
import { usePatients } from "@/lib/data";
import type { Patient } from "@/lib/interfaces";
import { SOI } from "@/lib/zod";
import * as React from "react";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import PatientQueue from "./patientQueue";

let socket: Socket;

const initialPatients: Patient[] = [
    // {
    //   PatientName: "Brock Break",
    //   SeverityOfIllness: "Extreme",
    //   RelevantInformation: "Shattered femur, needs urgent surgery",
    //   PositionInQueue: "0 (Current Patient)",
    //   RoomNumber: 115,
    // },
    // {
    //   PatientName: "Gail Rupture",
    //   SeverityOfIllness: "Extreme",
    //   RelevantInformation: "Severe head trauma",
    //   PositionInQueue: "1",
    //   RoomNumber: 155,
    // },
    // {
    //   PatientName: "Carrie Concussion",
    //   SeverityOfIllness: "Major",
    //   RelevantInformation: "Can't see straight, severe dizziness and nausea",
    //   PositionInQueue: "2",
    //   RoomNumber: 105,
    // },
    // {
    //   PatientName: "Billie Hurt",
    //   SeverityOfIllness: "Moderate",
    //   RelevantInformation: "Some lower back pain from car accident",
    //   PositionInQueue: "3",
    //   RoomNumber: 145,
    // },
    // {
    //   PatientName: "Johnny Bruise",
    //   SeverityOfIllness: "Minor",
    //   RelevantInformation: "Indicated pain on the ridge of his foot",
    //   PositionInQueue: "4",
    //   RoomNumber: 125,
    // },
    // {
    //   PatientName: "Wanda Whiplash",
    //   SeverityOfIllness: "Minor",
    //   RelevantInformation: "Some pain in lower back",
    //   PositionInQueue: "5",
    //   RoomNumber: 122,
    // },
];

const severityRank = {
    Extreme: 1,
    Major: 2,
    Moderate: 3,
    Minor: 4,
};

interface HCPDashboardProps {
    role: string;
}

export default function HCPDashboard({ role }: HCPDashboardProps) {
    const { patients, mutate } = usePatients();

    useEffect(() => {
        const socketInitializer = async () => {
            await fetch('/api/socket');
            socket = io();

            socket.on('connect', () => {
                console.log('connected')
            })

            socket.on('add-patient', newPatient => {
                mutate(patients.concat(newPatient));
            })

            socket.on('remove-patient', id => {
                mutate(patients.filter(patient => patient.id !== id));
            })
        }

        socketInitializer()
    }, []);

    async function postPatient(newPatient: Patient) {
        try {
            const response = await fetch('/api/patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPatient), // Convert to JSON string
            });

            if (!response.ok) {
                throw new Error('Failed to update patients');
            }

            socket.emit('emit-add-patient', newPatient);
            await mutate(patients.concat(newPatient));
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    const [newPatient, setNewPatient] = useState({
        PatientName: "",
        SeverityOfIllness: "Minor",
        RelevantInformation: "",
        RoomNumber: ""
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewPatient((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postPatient(newPatientData()).then(() => setNewPatient({
            PatientName: "",
            SeverityOfIllness: "Minor",
            RelevantInformation: "",
            RoomNumber: ""
        }))
    };

    function newPatientData(): Patient {
        return {
            PatientName: newPatient.PatientName,
            SeverityOfIllness: newPatient.SeverityOfIllness,
            RelevantInformation: newPatient.RelevantInformation,
            RoomNumber: parseInt(newPatient.RoomNumber, 10), // Ensure RoomNumber is a number,
            severityRank: severityRank[newPatient.SeverityOfIllness as keyof typeof SOI.Enum]
        }
    };

    return (
        <div>
            <PatientQueue />
            <CurrentPatientDialog />
            {role === 'receptionist' && (
                <div className="p-4 m-4 w-2/3 border rounded shadow-md">
                    <h2>Add New Patient</h2>
                    <form onSubmit={handleFormSubmit} className="mt-2 space-y-2">
                        <input
                            type="text"
                            name="PatientName"
                            value={newPatient.PatientName}
                            onChange={handleFormChange}
                            placeholder="Patient Name"
                            required
                        />
                        <select
                            name="SeverityOfIllness"
                            value={newPatient.SeverityOfIllness}
                            onChange={handleFormChange}
                        >
                            <option value="Extreme">Extreme</option>
                            <option value="Major">Major</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Minor">Minor</option>
                        </select>
                        <input
                            type="text"
                            name="RelevantInformation"
                            value={newPatient.RelevantInformation}
                            onChange={handleFormChange}
                            placeholder="Relevant Information"
                            required
                        />
                        <input
                            type="number"
                            name="RoomNumber"
                            value={newPatient.RoomNumber}
                            onChange={handleFormChange}
                            placeholder="Room Number"
                            required
                        />
                        <Button type="submit">Add Patient</Button>
                    </form>
                </div>
            )}
        </div>
    );
}