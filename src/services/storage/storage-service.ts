import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

export const storageService = {
  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  setString: (key: string, value: string): void => {
    storage.set(key, value);
  },

  getObject: <T>(key: string): T | undefined => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : undefined;
  },

  setObject: <T>(key: string, value: T): void => {
    storage.set(key, JSON.stringify(value));
  },

  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  setBoolean: (key: string, value: boolean): void => {
    storage.set(key, value);
  },

  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },

  setNumber: (key: string, value: number): void => {
    storage.set(key, value);
  },

  delete: (key: string): void => {
    storage.remove(key);
  },

  clearAll: (): void => {
    storage.clearAll();
  },

  contains: (key: string): boolean => {
    return storage.contains(key);
  },
};
