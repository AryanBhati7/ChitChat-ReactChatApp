import React from "react";
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

function Detail() {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    console.log("clicked block");
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser?.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
    changeBlock(chatId, !isCurrentUserBlocked, isReceiverBlocked);
  };
  return (
    <div className="details flex-1 overflow-y-scroll scrollbar-custom">
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
        </p>
      </div>
      <div className="info p-3">
        <Accordion type="single" collapsible className="w-full -space-y-3">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              Chat Settings
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              Privacy & Help
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              Shared Photos
            </AccordionTrigger>
            <AccordionContent className="photos flex flex-col gap-3">
              <div className="photo-container flex items-center justify-between">
                <div className="photoitem flex gap-3">
                  <img
                    src="https://images.pexels.com/photos/20541532/pexels-photo-20541532/free-photo-of-a-person-walking-down-a-street-in-front-of-a-large-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="img"
                    className="rounded-sm w-8 h-8"
                  />
                  <span className="text-md">photo_256456.jpg</span>
                </div>
                <MdDownloadForOffline className="h-5 w-5 cursor-pointer" />
              </div>
              <div className="photo-container flex items-center justify-between">
                <div className="photoitem flex gap-3">
                  <img
                    src="https://images.pexels.com/photos/20541532/pexels-photo-20541532/free-photo-of-a-person-walking-down-a-street-in-front-of-a-large-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="img"
                    className="rounded-sm w-8 h-8"
                  />
                  <span className="text-md">photo_256456.jpg</span>
                </div>
                <MdDownloadForOffline className="h-5 w-5 cursor-pointer" />
              </div>
              <div className="photo-container flex items-center justify-between">
                <div className="photoitem flex gap-3">
                  <img
                    src="https://images.pexels.com/photos/20541532/pexels-photo-20541532/free-photo-of-a-person-walking-down-a-street-in-front-of-a-large-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="img"
                    className="rounded-sm w-8 h-8"
                  />
                  <span className="text-md">photo_256456.jpg</span>
                </div>
                <MdDownloadForOffline className="h-5 w-5 cursor-pointer" />
              </div>
              <div className="photo-container flex items-center justify-between">
                <div className="photoitem flex gap-3">
                  <img
                    src="https://images.pexels.com/photos/20541532/pexels-photo-20541532/free-photo-of-a-person-walking-down-a-street-in-front-of-a-large-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="img"
                    className="rounded-sm w-8 h-8 "
                  />
                  <span className="text-md">photo_256456.jpg</span>
                </div>
                <MdDownloadForOffline className="h-5 w-5 cursor-pointer" />
              </div>
              <div className="photo-container flex items-center justify-between">
                <div className="photoitem flex gap-3">
                  <img
                    src="https://images.pexels.com/photos/20541532/pexels-photo-20541532/free-photo-of-a-person-walking-down-a-street-in-front-of-a-large-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="img"
                    className="rounded-sm w-8 h-8"
                  />
                  <span className="text-md">photo_256456.jpg</span>
                </div>
                <MdDownloadForOffline className="h-5 w-5 cursor-pointer" />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              Shared Files
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
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
          onClick={() => auth.signOut()}
          className="bg-blue-600 text-white flex gap-3 w-full hover:bg-blue-400"
        >
          <IoLogOutOutline /> Log out
        </Button>
      </div>
    </div>
  );
}

export default Detail;
