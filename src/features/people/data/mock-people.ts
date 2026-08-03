export interface PersonListItem {
  id: string;
  name: string;
  address: string;
  distance: string;
  avatarColor: string;
  isNew?: boolean;
}

export const MOCK_PEOPLE_LIST: PersonListItem[] = [
  { id: "1", name: "Mary Esivue", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#6D28D9", isNew: true },
  { id: "2", name: "Mary Esivue", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#6D28D9", isNew: true },
  { id: "3", name: "Mary Esivue", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#6D28D9", isNew: true },
  { id: "4", name: "Mary Esivue", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#6D28D9", isNew: true },
  { id: "5", name: "Mary Esivue", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#6D28D9", isNew: true },
];

export const MOCK_PEOPLE_SEARCH_RESULTS = [
  { id: "1", name: "Mary Emmuel", address: "No 2. Ojoo Alegongon Ibadan..." },
  { id: "2", name: "Mary Esivue", address: "No 2. Ojoo Alegongon Ibadan..." },
  { id: "3", name: "Mary Micheal", address: "No 2. Ojoo Alegongon Ibadan..." },
];

export interface ProfileDetails {
  id: string;
  name: string;
  address: string;
  distance: string;
  avatarColor: string;
  bio: string;
  interests: string[];
}

export const MOCK_PROFILE: ProfileDetails = {
  id: "1",
  name: "Mary Esivue",
  address: "No 2. Ojoo Alegongon Ibadan.",
  distance: "900m away",
  avatarColor: "#6D28D9",
  bio: 'A short bio or tagline (e.g., "Freelance photographer who loves exploring new events.").',
  interests: ["Techmeetup", "Events", "#Socializing"],
};

export const MOCK_SELF_PROFILE: ProfileDetails & { username: string; postCount: number } = {
  id: "me",
  name: "Mary Mataz",
  address: "500km away",
  distance: "500km away",
  avatarColor: "#6D28D9",
  username: "marymataz",
  bio: "Danielson is such a good boy, he is super friendly and will be a wonderful addition to any family.",
  interests: ["Tech Meetups", "Art & Culture", "Food & Drink", "Socializing", "Concerts", "Fitness & Sports"],
  postCount: 9,
};

export const MOCK_OWN_POSTS = Array.from({ length: 9 }, (_, index) => ({
  id: String(index + 1),
  color: ["#EA580C", "#7C3AED", "#F472B6", "#1F2937", "#78350F", "#111827", "#4C1D95", "#92400E", "#0F766E"][index],
}));

export interface Connection {
  id: string;
  name: string;
  distance: string;
  avatarColor: string;
  isConnected: boolean;
}

export const MOCK_FOLLOWERS: Connection[] = [
  { id: "1", name: "Mary Mataz", distance: "36km away", avatarColor: "#EA580C", isConnected: false },
  { id: "2", name: "Mary Mataz", distance: "36km away", avatarColor: "#EA580C", isConnected: true },
  { id: "3", name: "Mary Mataz", distance: "36km away", avatarColor: "#EA580C", isConnected: true },
  { id: "4", name: "Mary Mataz", distance: "36km away", avatarColor: "#EA580C", isConnected: true },
  { id: "5", name: "Mary Mataz", distance: "36km away", avatarColor: "#EA580C", isConnected: true },
  { id: "6", name: "Mary Mataz", distance: "36km away", avatarColor: "#EA580C", isConnected: true },
  { id: "7", name: "Mary Mataz", distance: "36km away", avatarColor: "#EA580C", isConnected: true },
  { id: "8", name: "Mary Mataz", distance: "36km away", avatarColor: "#EA580C", isConnected: true },
  { id: "9", name: "Mary Mataz", distance: "36km away", avatarColor: "#EA580C", isConnected: true },
];

export const MOCK_FOLLOWING: Connection[] = MOCK_FOLLOWERS.map((item) => ({
  ...item,
  isConnected: true,
}));
