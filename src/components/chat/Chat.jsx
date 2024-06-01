import React, { useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconContext } from "react-icons";
import { IoMdCall } from "react-icons/io";
import { IoVideocam, IoInformationCircle } from "react-icons/io5";
import { BsEmojiSmileFill, BsCameraFill } from "react-icons/bs";
import { TiMicrophone } from "react-icons/ti";
import { FaImage } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  doc,
  getDoc,
  onSnapshot,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/use-toast";
import upload from "@/lib/upload";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";

function Chat() {
  const toast = useToast();
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = React.useState({
    file: null,
    url: "",
  });
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };
  const handleImage = (e) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImg({ file, url });
  };
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => unSub();
  }, [chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (text === "") return;

    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        message: "Failed to send message",
        type: "error",
      });
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  return (
    <div className="chat border-r-[1px] border-r-gray-400 flex-col flex">
      <div className="top p-2 flex justify-between border-b-[1px] border-b-gray-400">
        <div className="user flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={user?.avatar || "https://github.com/shadcn.png"}
              className="object-cover"
            />
            <AvatarFallback>{user?.username || "useravatar"}</AvatarFallback>
          </Avatar>
          <div className="user-text">
            <span className="text-lg font-bold">
              {user?.username || "ChitChat User"}
            </span>
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
      <div className="center p-3 flex-1 flex flex-col gap-4 overflow-y-scroll scrollbar-custom">
        {/* {chat?.messages?.map((message) => (
          <div
            key={message.createdAt}
            className="received flex gap-3 max-w-[70%] "
          >
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
              <span className="text-gray-200">{message}</span>
            </div>
          </div>
        ))} */}

        {chat?.messages?.map((message) => (
          <React.Fragment key={message.createdAt}>
            {message.senderId === currentUser?.id ? (
              <SentMessage message={message} />
            ) : (
              <ReceivedMessage message={message} />
            )}
          </React.Fragment>
        ))}
        <div ref={endRef}></div>
      </div>
      <div
        className={`bottom flex items-center  gap-3 p-2 border-t-[1px] border-t-gray-400 ${
          isCurrentUserBlocked || isReceiverBlocked
            ? "opacity-50 pointer-events-none cursor-not-allowed"
            : ""
        }`}
      >
        <div className="icons flex items-center gap-3">
          <IconContext.Provider
            value={{
              color: "white",
              className: "cursor-pointer",
              size: "1.3em",
            }}
          >
            <label htmlFor="file">
              <FaImage />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImage}
            ></input>
            <BsCameraFill />
            <TiMicrophone />
          </IconContext.Provider>
        </div>
        <form
          onSubmit={handleSend}
          className="flex justify-between flex-1 items-center gap-4"
        >
          <input
            type="text"
            placeholder={
              isCurrentUserBlocked || isReceiverBlocked
                ? "You cannot send message to this user"
                : "Type a message..."
            }
            className="bg-gray-500 flex-1 focus:border-none active:border-none focus:outline-none  rounded-sm p-2"
            onChange={(e) => setText(e.target.value)}
            value={text}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
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
          <Button
            type="submit"
            onClick={handleSend}
            className={`${
              isCurrentUserBlocked || isReceiverBlocked
                ? "bg-light-blue cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-gray-400"
            }`}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
