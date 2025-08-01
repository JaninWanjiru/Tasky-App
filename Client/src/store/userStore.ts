import { create } from "zustand";
import type { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

const userStore: StateCreator<UserStore> = (set) => {
  return {
    user: null,
    setUser: (user: User) => {
      set(function () {
        return { user };
      });
    },
    logoutUser: () => {
      set(function () {
        return { user: null };
      });
    },
  };
};

const useUser = create(persist(userStore, { name: "Tasky-User" }));

export default useUser;
