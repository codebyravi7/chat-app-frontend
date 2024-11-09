import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col h-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Static Header */}
          <div className="relative z-10 top-16 bg-slate-500 px-4 py-2">
            <div className="text-gray-900 font-bold flex items-center">
              <img
                src={selectedConversation.profilePic}
                className="w-12 h-12 rounded-full mr-4"
                alt="Profile"
              />
              <span>{selectedConversation.fullName}</span>
            </div>
          </div>

          {/* Scrollable Messages */}
          <div className="pt-16 flex-grow overflow-y-auto">
            <Messages />
          </div>

          {/* Static Message Input */}
          <div className="mt-auto">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
