import { UserDetails } from "@server/middleware";
import { create } from "zustand";

type AuthStore = {
  user: null | UserDetails;
  actions: {
    signout: () => void;
  };
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  actions: {
    // TODO: Set user to null and hit api endpoint to remove and clear session in cookie
    signout: () => {},
  },
}));

export const useUser = () => useAuthStore((state) => state.user);
export const useUserActions = () => useAuthStore((state) => state.actions);
