"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { questionnaireSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../textarea";

interface PatientQuestionnaireProps {
  email?: string;
  name?: string;
}

export default function PatientQuestionnaire({ email, name }: PatientQuestionnaireProps) {
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof questionnaireSchema>>({
    resolver: zodResolver(questionnaireSchema),
  });

  const nameField = <FormField
    control={form.control}
    name='name'
    render={({ field }) => (
      <FormItem>
        <FormLabel>Full Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            defaultValue={name}
            required
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  const dobField = <FormField
    control={form.control}
    name='dob'
    render={({ field }) => (
      <FormItem>
        <FormLabel>Date of Birth</FormLabel>
        <FormControl>
          <Input
            type="date"
            placeholder="YYYY-MM-DD"
            required
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  const phnField = <FormField
    control={form.control}
    name='phn'
    render={({ field }) => (
      <FormItem>
        <FormLabel>Personal Health Number</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="1234123123"
            required
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  const emailField = <FormField
    control={form.control}
    name='email'
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            defaultValue={email}
            placeholder="mail@example.com"
            required
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  const symptomsField = <FormField
    control={form.control}
    name='symptoms'
    render={({ field }) => (
      <FormItem>
        <FormLabel>Describe your symptoms</FormLabel>
        <FormControl>
          <Textarea
            required
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  const historyField = <FormField
    control={form.control}
    name='medicalHistory'
    render={({ field }) => (
      <FormItem>
        <FormLabel>Brief medical history (allergies, past surgeries, etc.)</FormLabel>
        <FormControl>
          <Textarea
            required
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

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
        <DialogHeader>
          <DialogTitle>Patient Medical Questionnaire</DialogTitle>
          <DialogDescription>Please provide details about your medical condition.</DialogDescription>
        </DialogHeader>

        <Form {...form}>

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 overflow-auto">
            {nameField}
            {dobField}
            {phnField}
            {emailField}
            {symptomsField}
            {historyField}
            <Button className="mt-6" type="submit">Submit</Button>
            {submitted && <p className="mt-2 text-green-500">Thank you! Your response has been recorded.</p>}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
