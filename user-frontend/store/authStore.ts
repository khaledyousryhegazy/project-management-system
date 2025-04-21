import { ILoginData, IUser } from "@/interfaces/authInterfaces";
import { loginUser, registerUser } from "@/services/authServices";
import { create } from "zustand";

type State = {
  loading: boolean;
  user: IUser | null;
};

type Actions = {
  login: (data: ILoginData) => Promise<{
    success: boolean;
    error: string | null;
    token: string;
    user: IUser | null;
  }>;
  register: (
    data: FormData
  ) => Promise<{ success: boolean; error: string | null }>;
  setUser: (user: IUser | null) => void;
};

const useAuthentication = create<State & Actions>((set) => ({
  loading: false,
  user: null,
  setUser: (user) => set({ user }),

  login: async (data) => {
    try {
      set({ loading: true });

      const res = await loginUser(data);

      const token = res.token;
      const user = res.user;

      set({
        loading: false,
      });
      return { success: res.success, error: null, token: token, user: user };
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      set({ loading: false });
      return { success: false, error, token: "", user: null };
    }
  },

  register: async (formData: FormData) => {
    try {
      set({ loading: true });

      const res = await registerUser(formData);

      set({ loading: false });

      return { success: res.success, error: null };
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      set({ loading: false });
      return { success: false, error: err };
    }
  },
}));

export default useAuthentication;
