export const JERICHO_REGION = {
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
  coordinate: { latitude: number; longitude: number };
}

export const MOCK_NEARBY_PEOPLE: NearbyPerson[] = [
  { id: "1", name: "Tunde Bello", address: "Jericho, Ibadan", distance: "300m away", avatarColor: "#1F2937", coordinate: { latitude: 7.4162, longitude: 3.8672 } },
  { id: "2", name: "Amaka Obi", address: "Jericho, Ibadan", distance: "420m away", avatarColor: "#7C3AED", coordinate: { latitude: 7.4158, longitude: 3.869 } },
  { id: "3", name: "Bashir Adamu", address: "Jericho, Ibadan", distance: "500m away", avatarColor: "#A16207", coordinate: { latitude: 7.4148, longitude: 3.8665 } },
  { id: "4", name: "Halima Yusuf", address: "Jericho, Ibadan", distance: "650m away", avatarColor: "#065F46", coordinate: { latitude: 7.4146, longitude: 3.8688 } },
  { id: "5", name: "Zainab Kabir", address: "Jericho, Ibadan", distance: "700m away", avatarColor: "#9D174D", coordinate: { latitude: 7.4145, longitude: 3.8705 } },
  { id: "6", name: "Mary Esivue", address: "Ojoo Alegongon Ibadan.", distance: "900m away", avatarColor: "#6D28D9", coordinate: { latitude: 7.4132, longitude: 3.867 } },
  { id: "7", name: "David Okon", address: "Jericho, Ibadan", distance: "950m away", avatarColor: "#374151", coordinate: { latitude: 7.413, longitude: 3.8695 } },
  { id: "8", name: "Grace Nnamdi", address: "Jericho, Ibadan", distance: "1km away", avatarColor: "#B91C1C", coordinate: { latitude: 7.4128, longitude: 3.8715 } },
];
