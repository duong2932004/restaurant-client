import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // Nếu 401 và chưa retry
    if (response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        // Gọi refresh token
        await axiosInstance.post("/api/users/refresh");
        // Retry request ban đầu
        return axiosInstance(config);
      } catch (refreshError) {
        // Refresh thất bại → redirect login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    if (response?.status === 403) {
      if (typeof window !== "undefined") {
        window.location.href = "/forbidden";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
