"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // to display ER details
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input"; // for scheduling appointments
import PatientQuestionnaire from "@/components/ui/PatientQuestionaire"; // Import the questionnaire component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import * as React from "react";

import { useEffect } from "react";
import type { ER } from "../../../interfaces";

// Sample data for nearby emergency rooms
const initialERs = [
  {
    name: "City General Hospital",
    waitTime: "30 mins",
    condition: "Moderate",
  },
  {
    name: "Metro Health Center",
    waitTime: "1 hour",
    condition: "Busy",
  },
  {
    name: "Downtown Clinic",
    waitTime: "15 mins",
    condition: "Quiet",
  },
];

export default function PatientPage() {
  const [ERs, setERs] = React.useState<ER[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ers`);
        let ERList = await result.json();
        console.log(ERList);
        setERs(ERList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  const [appointments, setAppointments] = React.useState<string[]>([]);
  const [newAppointment, setNewAppointment] = React.useState("");

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
    <div className="relative min-h-screen p-6"> {/* Added padding to the container */}
      <Header title="Patient Dashboard" />

      {/* Nearby Emergency Rooms */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">Nearby Emergency Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"> {/* Responsive grid */}
          {ERs.map((er, index) => (
            <Card key={index}>
              <CardHeader>
                <h3>{er.name}</h3>
              </CardHeader>
              <CardContent>
                <p>Wait Time: {er.waitTime}</p>
                <p>Capacity: {er.capacity}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Medical Questionnaire */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">Patient Questionnaire</h2>
        <PatientQuestionnaire /> {/* Render the PatientQuestionnaire component */}
      </div>

      {/* Schedule an Appointment */}
      <div className="mt-10">
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
      </div>

      {/* Manage Appointments */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">Manage Appointments</h2>
        {appointments.length > 0 ? (
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
        )}
      </div>
    </div>
  );
}
