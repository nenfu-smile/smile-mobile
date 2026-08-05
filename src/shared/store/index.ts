import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV();

const zustandStorage = {
  getItem: (name: string) => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.remove(name),
};

interface AppState {
  user: string | null;
  token: string | null;
  setUser: (user: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export const useUser = () => useStore((state) => state.user);
export const useToken = () => useStore((state) => state.token);
export const useAuthActions = () =>
  useStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setToken: state.setToken,
      logout: state.logout,
    })),
  );
