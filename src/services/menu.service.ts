import axiosInstance from "@/lib/axios";
import { MenuItem, Category, ApiResponse } from "@/types/api";

export const menuService = {
  getAllMenuItems: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await axiosInstance.get("/menu/items");
    return response.data;
  },

  getMenuItemsByCategory: async (
    categoryId: string
  ): Promise<ApiResponse<MenuItem[]>> => {
    const response = await axiosInstance.get(
      `/menu/items/category/${categoryId}`
    );
    return response.data;
  },

  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await axiosInstance.get("/menu/categories");
    return response.data;
  },

  getMenuItemById: async (id: string): Promise<ApiResponse<MenuItem>> => {
    const response = await axiosInstance.get(`/menu/items/${id}`);
    return response.data;
  },

  createMenuItem: async (
    item: Omit<MenuItem, "id">
  ): Promise<ApiResponse<MenuItem>> => {
    const response = await axiosInstance.post("/menu/items", item);
    return response.data;
  },

  updateMenuItem: async (
    id: string,
    item: Partial<MenuItem>
  ): Promise<ApiResponse<MenuItem>> => {
    const response = await axiosInstance.put(`/menu/items/${id}`, item);
    return response.data;
  },

  deleteMenuItem: async (id: string): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.delete(`/menu/items/${id}`);
    return response.data;
  },
};
