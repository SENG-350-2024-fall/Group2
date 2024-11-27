'use client'

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitRegisterForm } from '@/lib/server-actions';
import { registerSchema } from "@/lib/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function RegisterForm() {
    const [registerError, setRegisterError] = useState<string | null>(null)
    const [registering, setRegistering] = useState<boolean>(false)

    function handleSubmit(data: z.infer<typeof registerSchema>) {
        setRegistering(true)

        submitRegisterForm(data)
            .then(result => {
                if (result?.error) {
                    setRegistering(false)
                    setRegisterError(result.error)
                }
            })
    }

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const nameField = <FormField control={form.control}
        name='name'
        render={({ field }) => (
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input
                        type="text"
                        placeholder="Jane Doe"
                        required
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />

    const emailField = <FormField control={form.control}
        name='email'
        render={({ field }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                        type="email"
                        placeholder="email@example.com"
                        required
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />

    const passwordField = <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input
                        type="password"
                        placeholder=""
                        required
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="m-auto space-y-3">
                {nameField}
                {emailField}
                {passwordField}
                <Button type="submit">Register</Button>
                {registerError && <p className="text-red-500">{registerError}</p>}
                {registering && <p>Registering...</p>}
            </form>
        </Form>
    )
}