import axiosInstance from "@/lib/axios";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Address {
  name: string;
  address: string;
  isDefault?: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  addresses?: Address[];
}

export const userService = {
  async register(data: RegisterData): Promise<User> {
    try {
      const response = await axiosInstance.post("/users/register", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  async login(data: LoginData): Promise<User> {
    try {
      const response = await axiosInstance.post("/users/login", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await axiosInstance.get("/users/me");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to get user");
    }
  },

  async logout(): Promise<{ success: boolean }> {
    try {
      await axiosInstance.post("/users/logout");
      return { success: true };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },

  async updateUser(data: LoginData): Promise<User> {
    try {
      const response = await axiosInstance.post("/users/update", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Update failed");
    }
  },
};
