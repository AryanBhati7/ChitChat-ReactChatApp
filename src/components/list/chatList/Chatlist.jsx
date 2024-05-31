import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { IconContext } from "react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Chatlist() {
  const [addMode, setAddMode] = useState(false);
  return (
    <div className="flex-1 overflow-y-scroll scrollbar-custom">
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
            {addMode ? <TiMinus /> : <MdAdd />}
          </div>
        </IconContext.Provider>
      </div>
      <div className="chatlist ">
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span className="font-semibold text-md">Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span>Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span>Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span>Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span>Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span>Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span>Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span>Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span>Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
        <div className="chat p-3 flex items-center gap-3 border-b-gray-300 border-b-[1px] cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="texts">
            <span>Janhvi Bhati</span>
            <p>Hello Hi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatlist;
