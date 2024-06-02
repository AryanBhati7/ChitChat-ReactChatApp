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
import { getDoc } from "firebase/firestore";
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
  DialogClose,
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
        const user = querySnapShot.docs[0].data();
        if (user.id !== currentUser.id) {
          if (!user.blocked.includes(currentUser.id)) {
            // Fetch all documents from userchats
            const userChatsRef = collection(db, "userchats");
            const userChatsSnapShot = await getDocs(userChatsRef);

            // Filter documents where chatId is equal to user.id
            const userChat = userChatsSnapShot.docs.find((doc) => {
              const data = doc.data().userchats; // Assuming userchats is the array of objects
              return data && data.some((item) => item.chatId === user.id);
            });

            if (!userChat) {
              // If userChat is undefined, it means the userId is not used as chatId yet
              setUser(user);
            }
          }
        }
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
      // Fetch current user's chats
      const currentUserChatsDoc = await getDoc(
        doc(userChatsRef, currentUser.id)
      );
      const currentUserChats = currentUserChatsDoc.data().chats;

      // Check if user is already in the chat
      if (currentUserChats.some((chat) => chat.receiverId === user.id)) {
        toast({
          title: "User already added",
          description: "This user is already in the chatlist",
          status: "error",
        });
        return;
      }

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
        description: "User has been added to the chat",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: "Unable to add user",
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
              <AvatarFallback>{user?.username || "avatar"}</AvatarFallback>
            </Avatar>
            <div className="username">{user?.username}</div>
          </div>
          <DialogClose asChild>
            <Button onClick={handleAdd}>Add User</Button>
          </DialogClose>
        </div>
      )}
    </DialogContent>
  );
}

export default AddUser;
