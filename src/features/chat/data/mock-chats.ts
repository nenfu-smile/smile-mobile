import type { ImageSourcePropType } from "react-native";

export interface ChatListItem {
  id: string;
  name: string;
  avatarColor: string;
  avatarImage?: ImageSourcePropType;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  type: "group" | "user";
  isTyping?: boolean;
}

export const MOCK_CHATS: ChatListItem[] = [
  {
    id: "1",
    name: "Tech Group",
    avatarColor: "#78350F",
    lastMessage: "I am waiting for my sister, What about you?",
    timestamp: "5min ago",
    unreadCount: 1,
    type: "group",
    isTyping: true,
  },
  {
    id: "2",
    name: "Devfest",
    avatarColor: "#4B5563",
    lastMessage: "I am waiting for my sister, What about you?",
    timestamp: "5min ago",
    unreadCount: 1,
    type: "group",
  },
  {
    id: "3",
    name: "John Doe",
    avatarColor: "#374151",
    avatarImage: require("@/assets/images/caller.jpg"),
    lastMessage: "I am waiting for my sister, What about you?",
    timestamp: "5min ago",
    type: "user",
  },
  {
    id: "4",
    name: "Startup firm",
    avatarColor: "#92400E",
    lastMessage: "I am waiting for my sister, What about you?",
    timestamp: "5min ago",
    type: "group",
  },
  {
    id: "5",
    name: "Event Mata",
    avatarColor: "#065F46",
    lastMessage: "I am waiting for my sister, What about you?",
    timestamp: "5min ago",
    type: "group",
  },
  {
    id: "6",
    name: "John Doe",
    avatarColor: "#7C2D12",
    avatarImage: require("@/assets/images/calling.jpg"),
    lastMessage: "I am waiting for my sister, What about you?",
    timestamp: "5min ago",
    unreadCount: 1,
    type: "user",
  },
  {
    id: "7",
    name: "John Doe",
    avatarColor: "#A16207",
    lastMessage: "I am waiting for my sister, What about you?",
    timestamp: "5min ago",
    unreadCount: 1,
    type: "user",
  },
  {
    id: "8",
    name: "John Doe",
    avatarColor: "#166534",
    lastMessage: "I am waiting for my sister, What about you?",
    timestamp: "5min ago",
    type: "user",
  },
  {
    id: "9",
    name: "John Doe",
    avatarColor: "#9D174D",
    lastMessage: "I am waiting for my sister, What about you?",
    timestamp: "5min ago",
    type: "user",
  },
];
