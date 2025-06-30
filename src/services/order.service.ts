import axiosInstance from "@/lib/axios";
import { Order, OrderStatus, ApiResponse } from "@/types/api";

export const orderService = {
  // Create new order
  createOrder: async (
    order: Omit<Order, "id" | "status" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Order>> => {
    const response = await axiosInstance.post("/orders", order);
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },

  // Get all orders (Admin/Staff only)
  getAllOrders: async (): Promise<ApiResponse<Order[]>> => {
    const response = await axiosInstance.get("/orders");
    return response.data;
  },

  // Get orders by status
  getOrdersByStatus: async (
    status: OrderStatus
  ): Promise<ApiResponse<Order[]>> => {
    const response = await axiosInstance.get(`/orders/status/${status}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (
    id: string,
    status: OrderStatus
  ): Promise<ApiResponse<Order>> => {
    const response = await axiosInstance.patch(`/orders/${id}/status`, {
      status,
    });
    return response.data;
  },

  // Cancel order
  cancelOrder: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await axiosInstance.post(`/orders/${id}/cancel`);
    return response.data;
  },

  // Get user's orders
  getUserOrders: async (): Promise<ApiResponse<Order[]>> => {
    const response = await axiosInstance.get("/orders/user");
    return response.data;
  },
};
