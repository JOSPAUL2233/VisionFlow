import axiosClient from "./axiosClient";

const authApi = {
  login: (credentials) => {
    // { username, password }
    const res = axiosClient.post("/Auth/login", credentials);
    return res;
  },

  refresh: () => {
    return axiosClient.post("/Auth/refresh");
  },

  logout: () => {
    return axiosClient.post("/Auth/logout");
  },

  me: () => {
    return axiosClient.get("Auth/me");
  }
};

export default authApi;
