"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import type { User, ER } from "../../../interfaces";
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  capacity: z.string()
})

interface HeaderProps {
  add: string;
}


export function AdminDialog({ add }: HeaderProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      capacity: undefined
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const ERobject: ER = {
      id: 0,
      name: values.name,
      capacity: parseInt(values.capacity)
    };

    const UserObject: ER = {
      id: 0,
      name: values.name,
    };

    const PostObject = add == "ER" ? ERobject: UserObject;
    
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${add}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(PostObject)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add {add}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New {add}</DialogTitle>
          <DialogDescription>
            Fill out the {add} data below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{add == "ER" ? "ER Name": "Username"}</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {add == "ER"
            ?
            <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Capacity of ER.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}/>
            : null}

            <Button type="submit">Add New {add}</Button>

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