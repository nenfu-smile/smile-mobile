import { create } from "zustand";

interface SignupLocation {
  latitude: number;
  longitude: number;
}

interface SignupState {
  email: string;
  fullName: string;
  countryDialCode: string;
  phoneNumber: string;
  interests: string[];
  photoUri: string | null;
  location: SignupLocation | null;
  setEmail: (email: string) => void;
  setFullName: (fullName: string) => void;
  setCountryDialCode: (dialCode: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  toggleInterest: (interest: string) => void;
  setPhotoUri: (uri: string | null) => void;
  setLocation: (location: SignupLocation | null) => void;
}

export const useSignupStore = create<SignupState>()((set) => ({
  email: "",
  fullName: "",
  countryDialCode: "+1",
  phoneNumber: "",
  interests: [],
  photoUri: null,
  location: null,
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
  setLocation: (location) => set({ location }),
}));
