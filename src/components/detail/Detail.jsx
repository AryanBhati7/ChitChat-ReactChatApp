import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Detail() {
  return (
    <div className="flex-1">
      <div className="user">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2>Aryan Bhati</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
          tempora corrupti amet quae placeat
        </p>
      </div>
      <div className="info"></div>
    </div>
  );
}

export default Detail;
