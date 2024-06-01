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
    const unsub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <SkeletonLoading />;

  return (
    <div className="h-[90vh] w-[90vw] text-white bg-[#172065c1] backdrop-blur-xl backdrop-saturate-200 border-2 rounded-sm  border-[#ffffffcf] flex">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <div className="flex gap-4 p-4 justify-evenly w-full items-center">
          <CreateAccount />
          <div className="separator h-[80%] w-[2px] bg-gray-600"></div>
          <Login />
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
