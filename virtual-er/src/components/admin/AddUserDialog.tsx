"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ER } from "@/lib/interfaces";
import { adminAddUserSchema } from "@/lib/zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { numUsers } from "@/lib/data";
import { adminAddUser } from "@/lib/server-actions";




export default function AddUserDialog() {

  const form = useForm<z.infer<typeof adminAddUserSchema>>({
    resolver: zodResolver(adminAddUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: ''
  }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof adminAddUserSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    adminAddUser(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill out the User data below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                  <Input
                        placeholder=""
                        required
                        {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
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
            <FormField
              control={form.control}
              name="password"
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Add New User</Button>

          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
          </DialogClose>
        </DialogFooter>


      </DialogContent>
    </Dialog>
  )
}