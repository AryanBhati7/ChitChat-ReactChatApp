import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import avatarPlaceholder from "@/assets/avatar.png";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(25, {
      message: "Username cannot be greater than 25 characters,",
    }),
  password: z.string().min(6, {
    message: "Password should minimum contain 6 characters.",
  }),
  email: z.string().email({
    message: "Valid email address is required. ",
  }),
});

export default function Createaccount({ className, ...props }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [avatar, setAvatar] = React.useState({
    file: null,
    url: "",
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleAvatar = (e) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setAvatar({ file, url });
  };

  function onSubmit(data) {
    data.avatar = avatar.file;
    console.log(data);
    const dataWithAvatarName = { ...data };

    // Replace the File object with a string representation
    dataWithAvatarName.avatar = avatar.file
      ? avatar.file.name
      : "No file selected";

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(dataWithAvatarName, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/12 space-y-4 text-black bg-white p-4 rounded-md "
        >
          <h2 className="text-xl font-bold">Create your account</h2>
          <p> Enter your information below to create your account</p>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormLabel
                  htmlFor="avatar"
                  className=" gap-11 hover:underline cursor-pointer"
                >
                  <img
                    src={avatar.url || avatarPlaceholder}
                    alt="avatar"
                    className="w-20 h-20 rounded-lg object-cover mx-auto"
                  />
                  Choose your Avatar
                </FormLabel>
                <FormControl>
                  <Input
                    id="avatar"
                    type="file"
                    {...field}
                    className="absolute opacity-0 w-0 h-0"
                    onChange={handleAvatar}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
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
                  <Input placeholder="johnwick07@gmail.com" {...field} />
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
                  <Input placeholder="*********" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create your Account
          </Button>
        </form>
      </Form>
    </>
  );
}
