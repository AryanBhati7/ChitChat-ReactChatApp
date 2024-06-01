import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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

function AddUser() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add a User</DialogTitle>
        <DialogDescription>
          Search for the user you want to add to this chat
        </DialogDescription>
      </DialogHeader>
      <div className="searchuser">
        <div className="flex items-center gap-4">
          <Input id="search" placeholder="Search for a user" />
          <Button>Search</Button>
        </div>
      </div>
      <div className="users flex items-center justify-between bg-gray-400 rounded-md p-2">
        <div className="user flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="username">Username</div>
        </div>
        <Button type="submit">Add User</Button>
      </div>
    </DialogContent>
  );
}

export default AddUser;
