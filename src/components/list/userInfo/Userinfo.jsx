import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { IoIosMore } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { IconContext } from "react-icons";

function Userinfo() {
  return (
    <div className="p-3 flex justify-between items-center">
      <div className="username-pic flex items-center gap-4 ">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="object-cover"
          />
          <AvatarFallback>profilePic</AvatarFallback>
        </Avatar>
        <div className="username text-xl">Aryan Bhati</div>
      </div>
      <div className="icons flex gap-4">
        <IconContext.Provider
          value={{
            color: "white",
            className: "cursor-pointer",
            size: "1.5em",
          }}
        >
          <IoIosMore />
          <IoVideocam />
          <TbEdit />
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Userinfo;
