"use client"; // Add this directive at the top of the file

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Patient } from "@/lib/interfaces";
import * as React from "react";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

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
enum SeverityOfIllness {
    Extreme = "Extreme",
    Major = "Major",
    Moderate = "Moderate",
    Minor = "Minor",
}
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
    useEffect(() => {
        const socketInitializer = async () => {
            await fetch('/api/socket');
            socket = io();

            socket.on('connect', () => {
                console.log('connected')
            })

            socket.on('update-patients', updatePatients => {
                setPostingData(true);
                setPostingData(false); // trigger a re-fetch
            })
        }

        socketInitializer()
    }, []);

    const [patients, setPatients] = React.useState<Patient[]>([]);
    const [postingData, setPostingData] = useState(false); // is there currently a post request

    // add useEffect for checking user type
    useEffect(() => {
        if (postingData) return; // Avoid fetching while posting data

        const fetchData = async () => {
            try {
                const PatientResult = await fetch('/api/patient');
                let PatientList = await PatientResult.json();
                setPatients(PatientList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [postingData]); // Only re-run this if `postingData` changes

    const currentPatient = patients[0] || null;
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Toggle modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen); // toggle visible

    const postData = async (updatedPatients: Patient[]) => {

        try {/*
    const response = await fetch('/api/patient', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatients), // Convert to JSON string
    });
      
    if (!response.ok) {
        throw new Error('Failed to update patients');
    }
      */
            setPostingData(false); // Reset postingData after successful post
            socket.emit('patient-change', updatedPatients);
        } catch (error) {
            console.error('Error posting data:', error);
            setPostingData(false); // Reset on error too
        }

    }
    const addPatient = (newPatient: Patient) => {
        setPatients((prevPatients) => {
            const updatedPatients = [...prevPatients, newPatient].sort((a, b) =>
                a.severityRank - b.severityRank
            ).map((patient, index) => ({
                ...patient,
                PositionInQueue: index === 0 ? "0 (Current Patient)" : index.toString(),
            }));

            setPostingData(true);
            postData(updatedPatients);
            return updatedPatients;
        });
    };
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
        addPatient(newPatientData);
        setNewPatient({
            PatientName: "",
            SeverityOfIllness: "Minor",
            RelevantInformation: "",
            RoomNumber: ""
        });
    };
    const newPatientData: Patient = {
        PatientName: newPatient.PatientName,
        SeverityOfIllness: newPatient.SeverityOfIllness,
        RelevantInformation: newPatient.RelevantInformation,
        PositionInQueue: patients.length.toString(),
        RoomNumber: parseInt(newPatient.RoomNumber, 10), // Ensure RoomNumber is a number,
        severityRank: severityRank[newPatient.SeverityOfIllness as keyof typeof SeverityOfIllness]
    };
    /*
    This function becomes more complicated as a result of updating the indexes correctly.
    It removes the patient that had their remove button clicked.
    */
    const removePatient = (index: number) => {
        setPostingData(true);

        setPatients((prevPatients) => {
            const updatedPatients = prevPatients.filter((_, i) => i !== index).map((patient, newIndex) => ({
                ...patient,
                PositionInQueue: newIndex.toString(),
            }));
            // Update the current patient position if there's any remaining
            if (updatedPatients.length > 0) {
                updatedPatients[0].PositionInQueue = "0 (Current Patient)";
            }
            setPostingData(true);
            postData(updatedPatients);
            return updatedPatients;
        });
    };

    return (
        <div>
            <div className="mt-10"> {/* 10px margin top for the table */}
                <div className="w-2/3 pl-10"> {/* Set width to 2/3 and left padding to 10px */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Severity of Illness</TableHead>
                                <TableHead>Relevant Information</TableHead>
                                <TableHead>Position in Queue</TableHead>
                                <TableHead>Room Number</TableHead>
                                <TableHead>Remove Patient</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.map((patient, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{patient.PatientName}</TableCell>
                                    <TableCell>{patient.SeverityOfIllness}</TableCell>
                                    <TableCell>{patient.RelevantInformation}</TableCell>
                                    <TableCell>{patient.PositionInQueue}</TableCell>
                                    <TableCell>{patient.RoomNumber}</TableCell>
                                    <TableCell><Button onClick={() => removePatient(index)}>
                                        Remove
                                    </Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Button
                className="fixed bottom-4 right-4" // Positioning the button at the bottom right
                onClick={toggleModal}
            >
                View Current Patient Information
            </Button>
            {isModalOpen && currentPatient && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Current Patient Information</h2>
                        <p><strong>Name:</strong> {currentPatient.PatientName}</p>
                        <p><strong>Severity of Illness:</strong> {currentPatient.SeverityOfIllness}</p>
                        <p><strong>Relevant Information:</strong> {currentPatient.RelevantInformation}</p>
                        <p><strong>Room Number:</strong> {currentPatient.RoomNumber}</p>
                        <Button onClick={toggleModal} className="mt-4">
                            Close
                        </Button>
                    </div>
                </div>
            )}
            {role === 'receptionist' && (
                <form onSubmit={handleFormSubmit} className="p-4 mt-4 border rounded shadow-md">
                    <h2>Add New Patient</h2>
                    <input
                        type="text"
                        name="PatientName"
                        value={newPatient.PatientName}
                        onChange={handleFormChange}
                        placeholder="Patient Name"
                        required
                        className="mt-2"
                    />
                    <select
                        name="SeverityOfIllness"
                        value={newPatient.SeverityOfIllness}
                        onChange={handleFormChange}
                        className="mt-2"
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
                        className="mt-2"
                    />
                    <input
                        type="number"
                        name="RoomNumber"
                        value={newPatient.RoomNumber}
                        onChange={handleFormChange}
                        placeholder="Room Number"
                        required
                        className="mt-2"
                    />
                    <Button type="submit" className="mt-4">Add Patient</Button>
                </form>
            )}
        </div>
    );
}