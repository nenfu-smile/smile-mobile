import { create } from "zustand";

interface SignupState {
  email: string;
  fullName: string;
  countryDialCode: string;
  phoneNumber: string;
  interests: string[];
  photoUri: string | null;
  setEmail: (email: string) => void;
  setFullName: (fullName: string) => void;
  setCountryDialCode: (dialCode: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  toggleInterest: (interest: string) => void;
  setPhotoUri: (uri: string | null) => void;
}

export const useSignupStore = create<SignupState>()((set) => ({
  email: "",
  fullName: "",
  countryDialCode: "+1",
  phoneNumber: "",
  interests: [],
  photoUri: null,
  setEmail: (email) => set({ email }),
  setFullName: (fullName) => set({ fullName }),
  setCountryDialCode: (countryDialCode) => set({ countryDialCode }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  toggleInterest: (interest) =>
    set((state) => ({
      interests: state.interests.includes(interest)
        ? state.interests.filter((item) => item !== interest)
        : [...state.interests, interest],
    })),
  setPhotoUri: (photoUri) => set({ photoUri }),
}));
