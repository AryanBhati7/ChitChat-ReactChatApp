import React from "react";
import { Button } from "@/components/ui/button";
import {
  Chat,
  List,
  Detail,
  Login,
  CreateAccount,
  SkeletonLoading,
} from "./components/index";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "@/store/userStore";
import { useChatStore } from "@/store/chatStore";
function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      await fetchUserInfo(user?.uid);
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <SkeletonLoading />;

  return (
    <div className="h-[90vh] w-[90vw] text-white bg-[rgba(23,32,101,0.75)] backdrop-blur-[20px] border-2 rounded-sm border-[#ffffffcf] flex">
      {" "}
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat className="md:flex hidden" />}
          {chatId && <Detail className="" />}
        </>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4 p-4 justify-evenly w-full items-center">
          <CreateAccount className={"sm:w-4/12 w-full"} />
          <div className="separator h-[80%] w-[2px] bg-gray-600"></div>
          <Login className={"w-full sm:w-4/12"} />
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
