import React, { useState } from "react";
import {
  arrayUnion,
  collection,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/userStore";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function AddUser() {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const handleSearch = async (data) => {
    console.log("searching for user");
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", data.username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: "Unable to create account",
        status: "error",
      });
    }
  };
  const handleAdd = async (e) => {
    console.log("adding user");
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    try {
      // Add user to chat
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
      toast({
        title: "User added successfully",
        description: "User has been added to the chat", // Add user to chat description
        status: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: "Unable to add user to chat",
        status: "error",
      });
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add a User</DialogTitle>
        <DialogDescription>
          Search for the user you want to add to this chat
        </DialogDescription>
      </DialogHeader>
      <div className="searchuser">
        <div className="flex items-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSearch)}
              className="w-full flex gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Search for username"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Search</Button>
            </form>
          </Form>
        </div>
      </div>
      {user && (
        <div className="users flex items-center justify-between bg-gray-400 rounded-md p-2">
          <div className="user flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={user.avatar || "https://github.com/shadcn.png"}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="username">{user?.username}</div>
          </div>
          <Button onClick={handleAdd}>Add User</Button>
        </div>
      )}
    </DialogContent>
  );
}

export default AddUser;
