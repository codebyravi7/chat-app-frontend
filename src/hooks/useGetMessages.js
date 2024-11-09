import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
 const {authUser} =useAuthContext()
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/messages/${
            selectedConversation._id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Auth: authUser?.token,
            },
          }
        );

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;