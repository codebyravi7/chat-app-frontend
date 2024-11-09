import React, { useState } from "react";
import { Menu } from "lucide-react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import logo from "../../assets/images/logo.png";
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="fixed  min-h-16 w-full bg-gray-800 top-0 left-0 z-50 flex justify-center items-center h-16">
        <button
          onClick={toggleSidebar}
          className="focus:outline-none absolute left-10 md:hidden"
        >
          {!isSidebarOpen ? (
            <Menu size={28} />
          ) : (
            <span className="border-2 rounded-md text-red-500 border-red-600 material-symbols-outlined">close</span>
          )}
        </button>
        <img className="w-52" src={logo} alt="Logo" />
      </nav>

      <div className="flex flex-col h-screen">
        <div className="flex-grow flex overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="flex-grow flex flex-col">
            <div className="flex-grow overflow-hidden bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 border-2 border-gray-800">
              <MessageContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
