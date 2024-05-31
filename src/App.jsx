import React from "react";
import { Button } from "@/components/ui/button";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Detail from "./components/detail/Detail";
function App() {
  return (
    <div className="h-[90vh] w-[90vw] text-white bg-[#172065c1] backdrop-blur-xl backdrop-saturate-200 border-2 rounded-sm  border-[#ffffffcf] flex">
      <List />
      <Chat />
      <Detail />
    </div>
  );
}

export default App;
