"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useERs } from "@/lib/data";
import { submitQuestionnaire } from "@/lib/server-actions";
import { erRequestSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { ScrollArea } from "../scroll-area";
import { Textarea } from "../textarea";

interface PatientQuestionnaireProps {
  email?: string;
  name?: string;
  er?: string;
}

export default function PatientQuestionnaire({ email, name, er }: PatientQuestionnaireProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const { ers, isLoading } = useERs();

  const form = useForm<z.infer<typeof erRequestSchema>>({
    resolver: zodResolver(erRequestSchema),
    defaultValues: {
      name: name ?? "",
      email: email ?? "",
      dob: "",
      // we set the phn to an empty string so the input field is empty
      // @ts-expect-error
      phn: "",
      symptoms: "",
      medicalHistory: "",
      erID: er ?? "",
    }
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

  const erField = <FormField
    control={form.control}
    name="erID"
    render={({ field }) => (
      <FormItem className="space-y-3">
        <FormLabel>Select an ER</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}>
            {ers.map((er) => (
              <FormItem key={er.id} className="space-x-2">
                <FormControl>
                  <RadioGroupItem value={er.id} />
                </FormControl>
                <FormLabel>
                  {er.name} - Wait time: {er.waitTime ?? 0} hours
                </FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
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

  const handleSubmit = async (data: z.infer<typeof erRequestSchema>) => {
    if (er !== undefined) {
      data.erID = er;
    }

    // Process or save the questionnaire data here
    setSubmitted(true);
    console.log(data);
    const result = await submitQuestionnaire(data);
    console.log(result);
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

        <ScrollArea className="h-96">
          <Form {...form}>

            <form className="space-y-4 overflow-auto">
              {nameField}
              {dobField}
              {phnField}
              {emailField}
              {er === undefined && isLoading ? <div>Loading ERs...</div> : erField}
              {symptomsField}
              {historyField}
            </form>
          </Form>
        </ScrollArea>
        {submitted && <p className=" text-green-500">Thank you! Your response has been recorded.</p>}
        <Button className="mt-2" type="submit" onClick={form.handleSubmit(handleSubmit)}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
