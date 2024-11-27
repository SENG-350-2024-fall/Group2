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
import { submitLoginForm } from '@/lib/server-actions';
import { credentialsSchema } from "@/lib/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginForm() {
    const [loginError, setLoginError] = useState<string | null>(null)

    function handleSubmit(data: z.infer<typeof credentialsSchema>) {
        submitLoginForm(data)
            .then(result => {
                if (result?.error) {
                    setLoginError(result.error)
                }
            })
    }

    const form = useForm<z.infer<typeof credentialsSchema>>({
        resolver: zodResolver(credentialsSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const emailField = <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
            <FormItem>
                <FormLabel>Username</FormLabel>
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
                {emailField}
                {passwordField}
                <Button type="submit">Login</Button>
                {loginError && <p className="text-red-500">{loginError}</p>}
            </form>
        </Form>
    )
}