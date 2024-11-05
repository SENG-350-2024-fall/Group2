"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as React from "react";

export default function PatientQuestionnaire() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [symptoms, setSymptoms] = React.useState("");
  const [medicalHistory, setMedicalHistory] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    // Process or save the questionnaire data here
    setSubmitted(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Fill Out Medical Questionnaire</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Patient Medical Questionnaire</DialogTitle>
        <DialogDescription>Please provide details about your medical condition.</DialogDescription>
        
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            placeholder="Contact Information"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <textarea
            placeholder="Describe your symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Brief medical history (allergies, past surgeries, etc.)"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <Button className="mt-6" onClick={handleSubmit}>
          Submit
        </Button>
        {submitted && <p className="mt-2 text-green-500">Thank you! Your response has been recorded.</p>}
      </DialogContent>
    </Dialog>
  );
}
