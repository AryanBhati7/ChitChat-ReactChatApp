import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import avatarPlaceholder from "@/assets/avatar.png";
import { useToast } from "@/components/ui/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import upload from "@/lib/upload";

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

  async function onSubmit(data) {
    data.avatar = avatar.file;
    console.log(data);
    const dataWithAvatarName = { ...data };

    // Replace the File object with a string representation
    dataWithAvatarName.avatar = avatar.file
      ? avatar.file.name
      : "No file selected";

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">
    //         {JSON.stringify(dataWithAvatarName, null, 2)}
    //       </code>
    //     </pre>
    //   ),
    // });
    setIsLoading(true);
    try {
      //Calling firebase auth here
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      //Calling firebase Storage for handling avatar image
      const avatarUrl = await upload(data.avatar);
      //Calling firebase firestore here
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        username: data.username,
        email: data.email,
        avatar: avatarUrl,
        id: user.uid,
        blocked: [],
      }); // Add user to firestore
      await setDoc(doc(db, "userchats", user.uid), {
        chats: [],
      }); //add Userchats
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
        status: "success",
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast({
        title: "An error occurred",
        description: "Unable to create account",
        status: "error",
      });
    }
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
