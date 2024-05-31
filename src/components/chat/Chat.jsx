import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconContext } from "react-icons";
import { IoMdCall } from "react-icons/io";
import { IoVideocam, IoInformationCircle } from "react-icons/io5";
import { BsEmojiSmileFill, BsCameraFill } from "react-icons/bs";
import { TiMicrophone } from "react-icons/ti";
import { FaImage } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";

import { Button } from "@/components/ui/button";

function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };
  return (
    <div className="chat border-r-[1px] border-r-gray-400 flex-col flex">
      <div className="top p-2 flex justify-between border-b-[1px] border-b-gray-400">
        <div className="user flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="user-text">
            <span className="text-lg font-bold">Suman Bhati</span>
            <p className="text-gray-200 text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laud
            </p>
          </div>
        </div>
        <div className="icons flex items-center gap-3">
          <IconContext.Provider
            value={{
              color: "white",
              className: "cursor-pointer",
              size: "1.5em",
            }}
          >
            <IoMdCall />
            <IoVideocam />
            <IoInformationCircle />
          </IconContext.Provider>
        </div>
      </div>
      <div className="center p-3 flex-1"></div>
      <div className="bottom flex items-center justify-between gap-3 p-2 border-t-[1px] border-t-gray-400">
        <div className="icons flex items-center gap-3">
          <IconContext.Provider
            value={{
              color: "white",
              className: "cursor-pointer",
              size: "1.3em",
            }}
          >
            <FaImage />
            <BsCameraFill />
            <TiMicrophone />
          </IconContext.Provider>
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="bg-gray-500 flex-1 focus:border-none active:border-none focus:outline-none  rounded-sm p-2"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="emoji relative">
          <IconContext.Provider
            value={{
              color: "white",
              className: "cursor-pointer",
              size: "1.3em",
            }}
          >
            <BsEmojiSmileFill onClick={() => setOpen((prev) => !prev)} />
          </IconContext.Provider>
          <div className="picker absolute bottom-[50px]">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <Button className="bg-blue-600 text-white hover:bg-gray-400">
          Send
        </Button>
      </div>
    </div>
  );
}

export default Chat;
