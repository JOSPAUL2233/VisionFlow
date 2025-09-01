import axiosClient from "./axiosClient";

const usersApi = {
  getRoles: () => {
    return axiosClient.get("/Common/GetRoles")
  }
};

export default usersApi;
