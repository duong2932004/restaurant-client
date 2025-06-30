import { useState, useCallback } from "react";
import { menuService } from "@/services/menu.service";
import { MenuItem, Category, ApiResponse } from "@/types/api";

export const useMenu = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await menuService.getAllMenuItems();
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await menuService.getAllCategories();
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getMenuItemsByCategory = useCallback(async (categoryId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await menuService.getMenuItemsByCategory(categoryId);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getMenuItems,
    getCategories,
    getMenuItemsByCategory,
  };
};
