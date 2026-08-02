export interface ChatMessage {
  id: string;
  text: string;
  fromMe: boolean;
  timestamp: string;
  dateLabel?: string;
}

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    text: "\"Yes! I'll be there at 3 PM, However i will be 10mins late ooo, Cos i will have to meet with my project Supervisor",
    fromMe: false,
    timestamp: "12:66pm",
  },
  {
    id: "2",
    text: "\"Yes! I'll be there at 3 PM, However i will be 10mins late ooo, Cos i will have to meet with my project Supervisor",
    fromMe: false,
    timestamp: "12:66pm",
    dateLabel: "Today, 2 January",
  },
  {
    id: "3",
    text: "Are you coming to the meetup tomorrow?",
    fromMe: true,
    timestamp: "12:66pm",
  },
  {
    id: "4",
    text: "\"Yes! I'll be there at 3 PM, However i will be 10mins late ooo, Cos i will have to meet with my project Supervisor",
    fromMe: false,
    timestamp: "12:66pm",
  },
  {
    id: "5",
    text: "Are you coming to the meetup tomorrow?",
    fromMe: true,
    timestamp: "12:66pm",
  },
];
