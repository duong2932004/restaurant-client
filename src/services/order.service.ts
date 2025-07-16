import axiosInstance from "@/lib/axios";
import { Order, OrderStatus, ApiResponse } from "@/types/api";

export const orderService = {
  createOrder: async (
    order: Omit<Order, "id" | "status" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Order>> => {
    const response = await axiosInstance.post("/orders", order);
    return response.data;
  },

  getOrderById: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },

  getAllOrders: async (): Promise<ApiResponse<Order[]>> => {
    const response = await axiosInstance.get("/orders");
    return response.data;
  },

  getOrdersByStatus: async (
    status: OrderStatus
  ): Promise<ApiResponse<Order[]>> => {
    const response = await axiosInstance.get(`/orders/status/${status}`);
    return response.data;
  },

  updateOrderStatus: async (
    id: string,
    status: OrderStatus
  ): Promise<ApiResponse<Order>> => {
    const response = await axiosInstance.patch(`/orders/${id}/status`, {
      status,
    });
    return response.data;
  },

  cancelOrder: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await axiosInstance.post(`/orders/${id}/cancel`);
    return response.data;
  },

  getUserOrders: async (): Promise<ApiResponse<Order[]>> => {
    const response = await axiosInstance.get("/orders/user");
    return response.data;
  },
};
