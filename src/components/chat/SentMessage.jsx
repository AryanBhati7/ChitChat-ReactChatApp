import React from "react";

function SentMessage({ message }) {
  return (
    <div className="sent flex self-end gap-3 max-w-[70%]">
      <div className="texts flex-1 flex flex-col gap-1">
        {message.img && (
          <img
            src={message.img}
            alt="img"
            className="rounded-lg w-full h-[300px] object-cover"
          />
        )}
        <p className="bg-blue-600 p-2 rounded-lg">{message.text}</p>
        <span className="text-gray-200">4 min ago</span>
      </div>
    </div>
  );
}

export default SentMessage;
