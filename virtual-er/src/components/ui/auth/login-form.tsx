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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginForm() {
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
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

    const userTypeField = <FormField
        control={form.control}
        name='user_type'
        render={({ field }) => (
            <FormItem>
                <FormLabel>User Type</FormLabel>
                <FormControl>
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                    >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem value="admin" />
                            </FormControl>
                            <FormLabel className="font-normal">
                                Admin
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem value="patient" />
                            </FormControl>
                            <FormLabel className="font-normal">
                                Patient
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem value="hcp" />
                            </FormControl>
                            <FormLabel className="font-normal">Healthcare Professional</FormLabel>
                        </FormItem>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />

    function onSubmit(values: z.infer<typeof signInSchema>) {
        const { email, password } = values;
        let redirect = '/';
        if (values.user_type === 'admin') {
            redirect = '/admin';
        } else if (values.user_type === 'hcp') {
            redirect = '/healthcareprofessional';
        } else if (values.user_type === 'patient') {
            redirect = '/patient';
        }

        signIn("credentials", { email, password, redirectTo: redirect });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto space-y-3">
                {emailField}
                {passwordField}
                {userTypeField}
                <Button type="submit">Login</Button>
            </form>
        </Form>
    )
}