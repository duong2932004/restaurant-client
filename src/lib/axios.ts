import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

let isRefreshing = false;

interface QueueItem {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}

let failedQueue: QueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log(` ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (!response) {
      console.error("Network error:", error.message);
      return Promise.reject(error);
    }

    if (response?.status === 401 && !config._retry) {
      if (config.url?.includes("/refresh")) {
        console.log("Refresh token expired, redirecting to login");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      if (config.url?.includes("/login")) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(config);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      config._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/users/refresh");
        processQueue(null, "success");
        return axiosInstance(config);
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.log("Refresh failed, redirecting to login");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (response?.status === 403) {
      if (typeof window !== "undefined") {
        window.location.href = "/forbidden";
      }
    }

    if (response.status === 404) {
      console.error("404 Error:", {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`,
        message: response.data?.message || "Not found",
      });
    }

    if (response.status >= 500) {
      console.error("Server error:", response.status, response.data);
    }

    return Promise.reject(error);
  }
);

export const clearFailedQueue = () => {
  failedQueue = [];
  isRefreshing = false;
};

export default axiosInstance;
