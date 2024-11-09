import React from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`mt-16 border-t-2
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transform transition-transform duration-300 ease-in-out
        fixed inset-y-0 left-0 z-30 w-full max-w-[500px] bg-gray-800 text-white
        md:relative md:translate-x-0
        border-r border-slate-500 p-4 flex flex-col
      `}
    >
      <SearchInput />

      <div className="divider h-[2px] bg-gray-600 my-4 w-full"></div>

      <div className="flex-grow overflow-y-auto">
        <Conversations />
      </div>

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
