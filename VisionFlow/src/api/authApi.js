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
};

export default authApi;
