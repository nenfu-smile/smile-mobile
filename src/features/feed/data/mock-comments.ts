export interface FeedComment {
  id: string;
  author: string;
  avatarColor: string;
  timestamp: string;
  text: string;
  reply?: {
    author: string;
    avatarColor: string;
    timestamp: string;
    text: string;
  };
}

export const MOCK_COMMENTS: FeedComment[] = [
  {
    id: "1",
    author: "Mary Mataz",
    avatarColor: "#EA580C",
    timestamp: "2s ago",
    text: "It looks like we are having trouble connecting. Please check your internet connection and try again.",
  },
  {
    id: "2",
    author: "Mary Mataz",
    avatarColor: "#EA580C",
    timestamp: "2s ago",
    text: "It looks like we are having trouble connecting. Please check your internet connection and try again.",
  },
  {
    id: "3",
    author: "Mary Mataz",
    avatarColor: "#EA580C",
    timestamp: "2s ago",
    text: "It looks like we are having trouble connecting. Please check your internet connection and try again.",
    reply: {
      author: "Mary Mataz",
      avatarColor: "#EA580C",
      timestamp: "2s ago",
      text: "It looks like we are having trouble connecting. Please check your interne",
    },
  },
];
