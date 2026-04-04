import { axiosInstance } from "@/lib/axios.ts";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;

  checkAdmin: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdmin: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.get("/admin/check");
      set({ isAdmin: true });
    } catch (error: any) {
      set({ isAdmin: false, error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
