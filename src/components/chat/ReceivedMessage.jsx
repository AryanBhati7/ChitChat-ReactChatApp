import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
function ReceivedMessage({ message }) {
  const createdAt = new Date(message.createdAt.seconds * 1000);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
  return (
    <div className="received flex gap-3 max-w-[70%] ">
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="object-cover align-top"
        />
        <AvatarFallback>profile</AvatarFallback>
      </Avatar>
      <div className="texts flex-1 flex flex-col gap-1">
        {message.img && (
          <img
            src={message.img}
            alt="img"
            className="rounded-lg w-full h-[300px] object-cover"
          />
        )}
        <p className="bg-gray-400 rounded-lg p-2">{message.text}</p>
        <span className="text-gray-200">{timeAgo}</span>
      </div>
    </div>
  );
}

export default ReceivedMessage;
