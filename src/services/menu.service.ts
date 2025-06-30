import axiosInstance from "@/lib/axios";
import { MenuItem, Category, ApiResponse } from "@/types/api";

export const menuService = {
  // Get all menu items
  getAllMenuItems: async (): Promise<ApiResponse<MenuItem[]>> => {
    const response = await axiosInstance.get("/menu/items");
    return response.data;
  },

  // Get menu items by category
  getMenuItemsByCategory: async (
    categoryId: string
  ): Promise<ApiResponse<MenuItem[]>> => {
    const response = await axiosInstance.get(
      `/menu/items/category/${categoryId}`
    );
    return response.data;
  },

  // Get all categories
  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await axiosInstance.get("/menu/categories");
    return response.data;
  },

  // Get menu item by ID
  getMenuItemById: async (id: string): Promise<ApiResponse<MenuItem>> => {
    const response = await axiosInstance.get(`/menu/items/${id}`);
    return response.data;
  },

  // Create new menu item (Admin only)
  createMenuItem: async (
    item: Omit<MenuItem, "id">
  ): Promise<ApiResponse<MenuItem>> => {
    const response = await axiosInstance.post("/menu/items", item);
    return response.data;
  },

  // Update menu item (Admin only)
  updateMenuItem: async (
    id: string,
    item: Partial<MenuItem>
  ): Promise<ApiResponse<MenuItem>> => {
    const response = await axiosInstance.put(`/menu/items/${id}`, item);
    return response.data;
  },

  // Delete menu item (Admin only)
  deleteMenuItem: async (id: string): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.delete(`/menu/items/${id}`);
    return response.data;
  },
};
