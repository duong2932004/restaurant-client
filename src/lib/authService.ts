import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/refresh`,
      {},
      {
        headers: {},
        withCredentials: true,
      }
    );

    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
