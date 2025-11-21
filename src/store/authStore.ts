import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: !!localStorage.getItem("token"), // 새로고침 시 유지
    id: localStorage.getItem("id") || null,
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    role: localStorage.getItem("role") || null,
  }),

  actions: {
    login(token: string, id: string, username: string, role: string) {
      this.isLoggedIn = true;
      this.id = id;
      this.token = token;
      this.username = username;
      this.role = role;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("id", id);
      localStorage.setItem("role", role);
    },

    logout() {
      this.isLoggedIn = false;
      this.token = null;
      this.username = null;
      this.role = null;
      this.id = null;

      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
    },
  },
});
