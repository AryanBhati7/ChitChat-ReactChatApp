import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { TiMinus } from "react-icons/ti";
import { IconContext } from "react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AddUser from "../AddUser";
import { useUserStore } from "@/store/userStore";
import { db } from "@/lib/firebase";

import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { set } from "react-hook-form";

function Chatlist() {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return { ...items, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => unSub();
  }, [currentUser.id]);

  return (
    <div className="flex-1 overflow-y-scroll scrollbar-custom">
      <Dialog>
        <div className="search flex  items-center px-2">
          <div className="searchbar flex-1 flex  bg-gray-400 items-center rounded-lg p-1">
            <IoSearch className="h-6 w-6" />
            <input
              placeholder="Search"
              className="pl-2 bg-transparent border-none focus:border-none active:border-none focus:outline-none w-full"
            />
          </div>
          <IconContext.Provider
            value={{ color: "white", className: "h-6 w-6 cursor-pointer" }}
          >
            <div onClick={() => setAddMode((prev) => !prev)}>
              <DialogTrigger asChild>
                {addMode ? <TiMinus /> : <MdAdd />}
              </DialogTrigger>
            </div>
          </IconContext.Provider>
          <AddUser />
        </div>
      </Dialog>
      <div className="chatlist ">
        {chats.map((chat) => (
          <div
            key={chat.chatId}
            className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer"
          >
            <Avatar>
              <AvatarImage
                src={chat.user.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>{chat.user.username}</AvatarFallback>
            </Avatar>
            <div className="texts">
              <span className="font-semibold text-md">
                {chat.user.username}
              </span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chatlist;
