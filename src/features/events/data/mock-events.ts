export interface EventAttendee {
  id: string;
  name: string;
  distance: string;
  avatarColor: string;
  added?: boolean;
}

export interface EventDetails {
  id: string;
  title: string;
  distance: string;
  date: string;
  time: string;
  about: string;
  interests: string[];
  attendeeCount: number;
  attendees: EventAttendee[];
}

export const MOCK_ATTENDEES: EventAttendee[] = [
  { id: "1", name: "Bad and Boujee", distance: "900m away", avatarColor: "#1F2937", added: true },
  { id: "2", name: "Bad and Boujee", distance: "900m away", avatarColor: "#7C3AED" },
  { id: "3", name: "Bad and Boujee", distance: "900m away", avatarColor: "#7C3AED" },
  { id: "4", name: "Bad and Boujee", distance: "900m away", avatarColor: "#7C3AED" },
  { id: "5", name: "Bad and Boujee", distance: "900m away", avatarColor: "#7C3AED" },
  { id: "6", name: "Bad and Boujee", distance: "900m away", avatarColor: "#7C3AED" },
];

export const MOCK_EVENT: EventDetails = {
  id: "1",
  title: "Tech Meetup at City Hall",
  distance: "900m away",
  date: "15-09-2024",
  time: "9:00AM -6:00PM",
  about:
    'Tech enthusiasts to discuss the latest trends in AI and blockchain technology. Join tech enthusiasts for a day of talks, demos, and networking.',
  interests: ["Techmeetup", "Events", "#Socializing"],
  attendeeCount: 234,
  attendees: MOCK_ATTENDEES,
};

export interface EventListItem {
  id: string;
  name: string;
  address: string;
  distance: string;
  avatarColor: string;
  trending?: boolean;
}

export const MOCK_EVENTS_LIST: EventListItem[] = [
  { id: "1", name: "Ibadan Tech Expo", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#1E293B", trending: true },
  { id: "2", name: "Startup Grind", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#78350F" },
  { id: "3", name: "Devfest Ibadan", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#4C1D95" },
  { id: "4", name: "Picnic Gathering", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#92400E" },
  { id: "5", name: "Linkedin Oyo", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#3F3F46" },
];

export const MOCK_EVENT_SEARCH_RESULTS = [
  { id: "1", name: "Ibadan Tech Expo", address: "Icc UI Second Gate, Ibadan" },
  { id: "2", name: "Ibadan Startup Grind", address: "Old Bodija, Ibadan" },
  { id: "3", name: "Ibadan Meet Up", address: "Near Mr Biggs , Mokola" },
];
