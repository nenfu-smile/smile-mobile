import { create } from "zustand";

interface RecoverState {
  email: string;
  countryDialCode: string;
  phoneNumber: string;
  setEmail: (email: string) => void;
  setCountryDialCode: (dialCode: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
}

export const useRecoverStore = create<RecoverState>()((set) => ({
  email: "",
  countryDialCode: "+1",
  phoneNumber: "",
  setEmail: (email) => set({ email }),
  setCountryDialCode: (countryDialCode) => set({ countryDialCode }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
}));
