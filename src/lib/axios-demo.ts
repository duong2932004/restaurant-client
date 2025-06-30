import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Định nghĩa hàm refreshToken
const refreshToken = async () => {
  try {
    // Gửi request tới endpoint refresh
    const response = await axios.post(
      `${baseURL}/auth/refresh`,
      {},
      {
        headers: {
          // Tùy thuộc backend, có thể cần gán refresh token trong headers hoặc cookie
          // Ví dụ:
          // 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
        },
        withCredentials: true, // nếu dùng cookie-based refresh
      }
    );

    // Giả sử server trả về new accessToken trong response.data.accessToken
    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // phânf sử lý của refrashToken khi token hết hạn
      try {
        const newToken = await refreshToken();
        localStorage.setItem("token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        axiosInstance(originalRequest);
        return Promise.reject(error);
      } catch (refreshError) {
        // Xử lý khi refresh token thất bại
        return Promise.reject(refreshError);
      }

      // if (error.response?.status === 401) {
      //   window.location.href = "/login";
      //   return Promise.reject(error);
      // }

      // if (error.response?.status === 403) {
      //   alert("Bạn không có đủ quyền hạn để thực hiện hành động này!");
      //   return Promise.reject(error);
      // }

      // return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
