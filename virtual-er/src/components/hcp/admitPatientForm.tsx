"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useERRequests } from "@/lib/data";
import { submitTriagePatient } from "@/lib/server-actions";
import { erRequestSchema, SOI, triageFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TriagePatientDialogProps {
    erRequestData: z.infer<typeof erRequestSchema>;
}

export default function TriagePatientDialog({ erRequestData }: TriagePatientDialogProps) {
    const [submitted, setSubmitted] = useState(false);
    const { mutate } = useERRequests(erRequestData.erID);

    const form = useForm<z.infer<typeof triageFormSchema>>({
        resolver: zodResolver(triageFormSchema),
        defaultValues: {
            roomNumber: 0,
            severityOfIllness: SOI.enum.Moderate,
            relevantInformation: "",
        }
    });

    const soiField = <FormField
        control={form.control}
        name='severityOfIllness'
        render={({ field }) => (
            <FormItem>
                <FormLabel>Severity of Illness</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="SOI" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value={SOI.enum.Extreme}>{SOI.enum.Extreme}</SelectItem>
                        <SelectItem value={SOI.enum.Major}>{SOI.enum.Major}</SelectItem>
                        <SelectItem value={SOI.enum.Moderate}>{SOI.enum.Moderate}</SelectItem>
                        <SelectItem value={SOI.enum.Minor}>{SOI.enum.Minor}</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )}
    />

    const relevantInformationField = <FormField
        control={form.control}
        name='relevantInformation'
        render={({ field }) => (
            <FormItem>
                <FormLabel>Relevant Information</FormLabel>
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

    const roomNumberField = <FormField
        control={form.control}
        name='roomNumber'
        render={({ field }) => (
            <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                    <Input
                        type="number"
                        placeholder="100"
                        required
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />

    const handleSubmit = async (data: z.infer<typeof triageFormSchema>) => {
        const result = await submitTriagePatient(data, erRequestData);
        console.log("hello")
        if (result.error) {
            console.error(result.error);
        } else {
            console.log(result);
            setSubmitted(true);
            await mutate();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Triage and Admit Patient</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Triage Patient {erRequestData.name}</DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-auto">
                    <Form {...form}>

                        <form className="space-y-4 overflow-auto">
                            {soiField}
                            {relevantInformationField}
                            {roomNumberField}
                        </form>
                    </Form>
                </ScrollArea>
                {submitted && <p className=" text-green-500">Thank you! Your response has been recorded.</p>}
                <Button className="mt-2" type="submit" onClick={form.handleSubmit(handleSubmit)}>Submit</Button>
            </DialogContent>
        </Dialog>
    );
}
