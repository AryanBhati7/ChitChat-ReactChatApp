import React from "react";
import { Userinfo, Chatlist } from "../index";

function List() {
  return (
    <div className="flex-1 flex flex-col border-r-[1px] border-r-gray-400">
      <Userinfo />
      <Chatlist />
    </div>
  );
}

export default List;
