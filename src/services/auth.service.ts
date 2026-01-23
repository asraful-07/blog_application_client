import { env } from "@/env";

const API_URL = env.API_URL;

export const authService = {
  getUserService: async function () {
    try {
      const res = await fetch(`${API_URL}/api/user`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      console.error("An error occurred:", err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
