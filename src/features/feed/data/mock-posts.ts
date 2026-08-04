export interface FeedPost {
  id: string;
  authorName: string;
  location: string;
  avatarColor: string;
  type: "poster" | "text";
  posterLabel?: string;
  posterColor?: string;
  text?: string;
  likes: string;
  comments: string;
  shares: string;
  isOwn?: boolean;
}

export const MOCK_POSTS: FeedPost[] = [
  {
    id: "1",
    authorName: "John Doe",
    location: "Seattle, washington",
    avatarColor: "#78350F",
    type: "poster",
    posterLabel: "Saturday Party",
    posterColor: "#3B0764",
    likes: "234k",
    comments: "234k",
    shares: "234k",
  },
  {
    id: "2",
    authorName: "Mary Mataz",
    location: "900m away",
    avatarColor: "#EA580C",
    type: "text",
    text: "It looks like we are having trouble connecting. Please check your internet connection and try again.",
    likes: "234k",
    comments: "234k",
    shares: "234k",
  },
  {
    id: "3",
    authorName: "You",
    location: "Jericho, Ibadan",
    avatarColor: "#6D28D9",
    type: "text",
    text: "Had an amazing time at the tech meetup today, can't wait for the next one!",
    likes: "12k",
    comments: "340",
    shares: "56",
    isOwn: true,
  },
];
