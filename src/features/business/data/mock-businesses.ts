export interface BusinessListItem {
  id: string;
  name: string;
  category: string;
  address: string;
  distance: string;
  avatarColor: string;
  offset: { latitude: number; longitude: number };
}

export const MOCK_BUSINESSES: BusinessListItem[] = [
  {
    id: "1",
    name: "Blessign Couture",
    category: "Fashion",
    address: "Jericho, Ibadan",
    distance: "300m away",
    avatarColor: "#DB2777",
    offset: { latitude: 0.0009, longitude: 0.0022 },
  },
  {
    id: "2",
    name: "Grandfield Hotels",
    category: "Hospitality",
    address: "Jericho, Ibadan",
    distance: "500m away",
    avatarColor: "#B91C1C",
    offset: { latitude: -0.0006, longitude: 0.0031 },
  },
  {
    id: "3",
    name: "Molete Market",
    category: "Retail",
    address: "Jericho, Ibadan",
    distance: "650m away",
    avatarColor: "#1D4ED8",
    offset: { latitude: 0.0021, longitude: 0.0006 },
  },
  {
    id: "4",
    name: "Taska Energy Resources",
    category: "Services",
    address: "Jericho, Ibadan",
    distance: "800m away",
    avatarColor: "#7C3AED",
    offset: { latitude: -0.0019, longitude: -0.0008 },
  },
];
