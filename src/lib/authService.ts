import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

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
