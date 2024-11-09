import { create } from "zustand";
const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;


export const useDisplay = create((set) => ({
	display: false,
	setdisplay: (display) => set(display)
}))