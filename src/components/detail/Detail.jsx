import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdDownloadForOffline } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useChatStore } from "@/store/chatStore";
import { arrayRemove } from "firebase/firestore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/use-toast";
import { onSnapshot } from "firebase/firestore";

function Detail({ className }) {
  const [images, setImages] = React.useState([]);
  const { toast } = useToast();
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
  } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    const chatDocRef = doc(db, "chats", chatId);
    const unsubscribe = onSnapshot(chatDocRef, (doc) => {
      if (doc.exists()) {
        const chatData = doc.data();
        const imageUrls = chatData.messages
          .filter((message) => message.img)
          .map((message) => message.img);

        setImages(imageUrls);
      }
    });

    return () => unsubscribe();
  }, [chatId]);
  console.log(images);
  const handleBlock = async () => {
    console.log("clicked block");
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser?.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
      toast({
        title: "User Blocked successfully",
        description: "Now, they can't send you messages.",
        status: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };
  return (
    <div
      className={`details flex-1 overflow-y-scroll scrollbar-custom ${className}`}
    >
      <div className="user flex flex-col p-3 gap-2 justify-center items-center border-b-[1px] border-b-gray-400 pb-2">
        <Avatar className="w-3/12 h-3/12">
          <AvatarImage
            src={user?.avatar || "https://github.com/shadcn.png"}
            className="object-cover"
          />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>
        <h2 className="font-bold text-xl">
          {user?.username || "Chitchat User"}
        </h2>
        <p className="text-center">
          Life is like riding a bicycle. To keep your balance, you must keep
          moving.
        </p>
      </div>
      <div className="info p-3">
        <Accordion type="single" collapsible className="w-full -space-y-3">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              Chat Settings
            </AccordionTrigger>
            <AccordionContent>Currently in Development 🧑‍💻</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              Privacy & Help
            </AccordionTrigger>
            <AccordionContent>Currently in Development 🧑‍💻</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              Shared Photos
            </AccordionTrigger>
            <AccordionContent className="photos flex w-full p-2 items-center flex-wrap gap-5">
              {images &&
                images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="shared"
                    className="w-32 h-32 rounded-lg"
                  />
                ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              Shared Files
            </AccordionTrigger>
            <AccordionContent>Currently in Development 🧑‍💻</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="buttons flex flex-col gap-5 p-3">
        <Button onClick={handleBlock} variant="destructive" className="w-full">
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "Unblock"
            : "Block"}
        </Button>
        <Button
          onClick={handleLogout}
          className="bg-blue-600 text-white flex gap-3 w-full hover:bg-blue-400"
        >
          <IoLogOutOutline /> Log out
        </Button>
      </div>
    </div>
  );
}

export default Detail;
