import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddUser from "../AddUser";
import { useUserStore } from "@/store/userStore";
import { db } from "@/lib/firebase";

import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { set } from "react-hook-form";
import { useChatStore } from "@/store/chatStore";

function Chatlist() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
    } catch (error) {
      console.log(error);
    }
    changeChat(chat.chatId, chat.user);
  };

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => unSub();
  }, [currentUser.id]);

  const filteredChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(input.toLowerCase())
  );
  console.log(filteredChats);

  return (
    <div className="flex-1 overflow-y-scroll scrollbar-custom">
      <Dialog>
        <div className="search flex  items-center px-2">
          <div className="searchbar flex-1 flex  bg-gray-400 items-center rounded-lg p-1">
            <IoSearch className="h-6 w-6" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search"
              className="pl-2 bg-transparent border-none focus:border-none active:border-none focus:outline-none w-full"
            />
          </div>
          <IconContext.Provider
            value={{ color: "white", className: "h-6 w-6 cursor-pointer" }}
          >
            <DialogTrigger asChild>
              <IoIosAddCircle />
            </DialogTrigger>
          </IconContext.Provider>
          <AddUser />
        </div>
      </Dialog>
      <div className="chatlist ">
        {filteredChats.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer"
            style={
              chat?.isSeen
                ? { backgroundColor: "transparent" }
                : { backgroundColor: "blue" }
            }
          >
            <Avatar>
              <AvatarImage
                src={
                  chat.user.blocked.includes(currentUser.id)
                    ? "https://github.com/shadcn.png"
                    : chat.user.avatar
                }
                className="object-cover"
              />
              <AvatarFallback>{chat.user.username}</AvatarFallback>
            </Avatar>
            <div className="texts">
              <span className="font-semibold text-md">
                {chat.user.blocked.includes(currentUser.id)
                  ? "Blocked"
                  : chat.user.username}
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
