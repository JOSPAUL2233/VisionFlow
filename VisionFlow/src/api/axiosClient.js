import axios from "axios";
import authApi from "./authApi";

const axiosClient = axios.create({
  baseURL: "https://localhost:7162/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor (optional logging, auth)
axiosClient.interceptors.response.use(
  (response) => response,
  
  async (error) => {

    console.log("inside interseptor!");

    if (error.response?.status === 401) {

      console.warn("Access token expired, attempting refresh...");
      
      try {
        await authApi.refresh();
        return axiosClient.request(error.config); // retry original request
      } catch (refreshError) {

        console.error("Refresh failed:", refreshError);
        
      }
    }
    return Promise.reject(error);
  }

);

export default axiosClient;
