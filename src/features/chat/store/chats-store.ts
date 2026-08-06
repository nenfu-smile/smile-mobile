import { create } from "zustand";

import { MOCK_CHATS, type ChatListItem } from "@/features/chat/data/mock-chats";

interface ChatsState {
  chats: ChatListItem[];
  deleteChat: (id: string) => void;
}

export const useChatsStore = create<ChatsState>()((set) => ({
  chats: MOCK_CHATS,
  deleteChat: (id) =>
    set((state) => ({ chats: state.chats.filter((chat) => chat.id !== id) })),
}));
