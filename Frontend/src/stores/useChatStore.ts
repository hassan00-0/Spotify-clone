import { axiosInstance } from "@/lib/axios.ts";
import { create } from "zustand";
import type { User } from "@/types";

interface ChatStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data.users || [] });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Server is offline or unreachable";
      set({ error: errorMessage, users: [] });
      console.error("Fetch error:", errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));
