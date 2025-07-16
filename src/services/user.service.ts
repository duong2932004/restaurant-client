import axiosInstance from "@/lib/axios";
import { handleServiceError, ErrorResponse } from "@/lib/serviceHelpers";

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
  async register(data: RegisterData): Promise<User | ErrorResponse> {
    try {
      const response = await axiosInstance.post("/users/register", data);
      return response.data;
    } catch (error: any) {
      return handleServiceError(error, "Registration failed");
    }
  },

  async login(data: LoginData): Promise<User | ErrorResponse> {
    try {
      const response = await axiosInstance.post("/users/login", data);
      return response.data;
    } catch (error: any) {
      return handleServiceError(error, "Login failed");
    }
  },

  async getCurrentUser(): Promise<User | ErrorResponse> {
    try {
      const response = await axiosInstance.get("/users/me");
      return response.data;
    } catch (error: any) {
      return handleServiceError(error, "Failed to get user");
    }
  },

  async logout(): Promise<{ success: boolean } | ErrorResponse> {
    try {
      await axiosInstance.post("/users/logout");
      return { success: true };
    } catch (error: any) {
      return handleServiceError(error, "Logout failed");
    }
  },
};
