import axios from "@/lib/axios";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export const userService = {
  async register(data: RegisterData): Promise<User> {
    const response = await axios.post("/api/users/register", data);
    return response.data;
  },

  async login(data: LoginData): Promise<User> {
    const response = await axios.post("/api/users/login", data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await axios.get("/api/users/me");
    return response.data;
  },

  async logout(): Promise<void> {
    await axios.post("/api/users/logout");
  },
};
