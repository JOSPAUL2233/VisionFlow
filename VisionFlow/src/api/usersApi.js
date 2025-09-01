import axiosClient from "./axiosClient";

const usersApi = {
  getUserList: () => {
    return axiosClient.get("/UserManagement/GetUserList")
  },
  registerUser: (user) => {
    return axiosClient.post("/UserManagement/RegisterUser", user)
  },
  updateUser: (user) => {
    return axiosClient.put("/UserManagement/UpdateUser", user)
  },
  deleteUser: (id) => {
    return axiosClient.delete(`/UserManagement/DeleteUser/${id}`)
  },
  getRoles: () => {
    return axiosClient.get("/Common/GetRoles")
  }
};

export default usersApi;
