export const DEFAULT_REGION = {
  latitude: 7.4145,
  longitude: 3.868,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export interface NearbyPerson {
  id: string;
  name: string;
  address: string;
  distance: string;
  avatarColor: string;
  // Offset from the map's center point (live location once available),
  // in degrees, so the mock cluster relocates with the user.
  offset: { latitude: number; longitude: number };
}

export const MOCK_NEARBY_PEOPLE: NearbyPerson[] = [
  { id: "1", name: "Tunde Bello", address: "Jericho, Ibadan", distance: "300m away", avatarColor: "#1F2937", offset: { latitude: 0.0017, longitude: -0.0008 } },
  { id: "2", name: "Amaka Obi", address: "Jericho, Ibadan", distance: "420m away", avatarColor: "#7C3AED", offset: { latitude: 0.0013, longitude: 0.001 } },
  { id: "3", name: "Bashir Adamu", address: "Jericho, Ibadan", distance: "500m away", avatarColor: "#A16207", offset: { latitude: 0.0003, longitude: -0.0015 } },
  { id: "4", name: "Halima Yusuf", address: "Jericho, Ibadan", distance: "650m away", avatarColor: "#065F46", offset: { latitude: 0.0001, longitude: 0.0008 } },
  { id: "5", name: "Zainab Kabir", address: "Jericho, Ibadan", distance: "700m away", avatarColor: "#9D174D", offset: { latitude: 0, longitude: 0.0025 } },
  { id: "6", name: "Mary Esivue", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#6D28D9", offset: { latitude: -0.0013, longitude: -0.001 } },
  { id: "7", name: "David Okon", address: "Jericho, Ibadan", distance: "950m away", avatarColor: "#374151", offset: { latitude: -0.0015, longitude: 0.0015 } },
  { id: "8", name: "Grace Nnamdi", address: "Jericho, Ibadan", distance: "1km away", avatarColor: "#B91C1C", offset: { latitude: -0.0017, longitude: 0.0035 } },
];
