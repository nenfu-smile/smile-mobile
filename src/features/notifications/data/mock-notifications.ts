export interface NotificationItem {
  id: string;
  kind: "reminder" | "connection" | "post";
  title: string;
  description: string;
  highlight?: string;
  timestamp: string;
  avatarColor: string;
}

export interface NotificationGroup {
  label: string;
  items: NotificationItem[];
}

export const MOCK_NOTIFICATIONS: NotificationGroup[] = [
  {
    label: "Today",
    items: [
      {
        id: "1",
        kind: "reminder",
        title: "Reminder",
        description: "Tech Innovators Meetup 2024 Tomorrow!",
        timestamp: "5min ago",
        avatarColor: "#FFE4CC",
      },
      {
        id: "2",
        kind: "connection",
        title: "Connection",
        description: "Cynthia Carson follow you",
        timestamp: "5min ago",
        avatarColor: "#1F2937",
      },
      {
        id: "3",
        kind: "post",
        title: "Post",
        description: "Cynthia Carson like your",
        highlight: "post",
        timestamp: "5min ago",
        avatarColor: "#B91C1C",
      },
      {
        id: "4",
        kind: "post",
        title: "Post",
        description: "Cynthia Carson commented on your",
        highlight: "post",
        timestamp: "5min ago",
        avatarColor: "#065F46",
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        id: "5",
        kind: "connection",
        title: "Connection",
        description: "Cynthia Carson follow you",
        timestamp: "5min ago",
        avatarColor: "#78350F",
      },
      {
        id: "6",
        kind: "post",
        title: "Post",
        description: "Cynthia Carson commented on your",
        highlight: "post",
        timestamp: "5min ago",
        avatarColor: "#111827",
      },
    ],
  },
];
