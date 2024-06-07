import User, { UserRoles } from "@/models/user";
import { setAxiosAuthHeader } from "@/config/axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState: User = {
  id: 0,
  username: "",
  email: "",
  role: UserRoles.EMPLOYEE,
  createdAt: new Date(),
  updatedAt: new Date(),
};

type UserStoreProps = {
  user: User;
  token: string;
  userPersist: (u: User, token: string) => void;
  userRemove: () => void;
  authorized: boolean;
};

export const useAuthStore = create<
  UserStoreProps,
  [["zustand/persist", "unknown"]]
>(
  persist(
    (set) => ({
      user: initialState,
      token: "",
      authorized: false,
      userPersist: (u, token) =>
        set((_) => ({ user: u, token: token, authorized: true })),
      userRemove: () =>
        set((_) => ({ user: initialState, token: "", authorized: false })),
    }),
    {
      name: "login-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage() {
        return (state, error) => {
          if (error) {
            console.log(error);
            return;
          }
          if (state && state.token) {
            setAxiosAuthHeader(state.token);
          }
        };
      },
    },
  ),
);
