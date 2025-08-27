import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7162/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor (optional logging, auth)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
