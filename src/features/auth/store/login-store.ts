import { create } from "zustand";

interface LoginState {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

export const useLoginStore = create<LoginState>()((set) => ({
  phoneNumber: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
}));
