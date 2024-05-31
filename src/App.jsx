import React from "react";
import { Button } from "@/components/ui/button";
import { Chat, List, Detail, Login, CreateAccount } from "./components/index";

function App() {
  const user = false;
  return (
    <div className="h-[90vh] w-[90vw] text-white bg-[#172065c1] backdrop-blur-xl backdrop-saturate-200 border-2 rounded-sm  border-[#ffffffcf] flex">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <div className="flex gap-4 p-10 justify-between">
          <CreateAccount />
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
