import React from "react";
import { Button } from "@/components/ui/button";
import { Chat, List, Detail, Login, CreateAccount } from "./components/index";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const user = true;
  return (
    <div className="h-[90vh] w-[90vw] text-white bg-[#172065c1] backdrop-blur-xl backdrop-saturate-200 border-2 rounded-sm  border-[#ffffffcf] flex">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
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
