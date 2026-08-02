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
