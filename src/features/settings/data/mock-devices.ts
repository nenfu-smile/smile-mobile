export interface DeviceSession {
  id: string;
  name: string;
  status: string;
  location: string;
}

export const CURRENT_DEVICE: DeviceSession = {
  id: "current",
  name: "iPhone 15 Pro",
  status: "This Device . Online",
  location: "Lagos, Nigeria",
};

export const MOCK_ACTIVE_SESSIONS: DeviceSession[] = [
  { id: "1", name: "iPhone 15 Pro", status: "This Device . Online", location: "Lagos, Nigeria" },
  { id: "2", name: "iPhone 15 Pro", status: "This Device . Online", location: "Lagos, Nigeria" },
  { id: "3", name: "iPhone 15 Pro", status: "This Device . Online", location: "Lagos, Nigeria" },
];

export const DELETE_ACCOUNT_REASONS = [
  "I no longer find the app useful",
  "I have privacy concerns",
  "I'm receiving too many notifications",
  "I'm having issues with the app",
  "Other (Specify)",
];
