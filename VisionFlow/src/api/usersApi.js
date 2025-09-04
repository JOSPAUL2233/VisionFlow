import axiosClient from "./axiosClient";

const usersApi = {
  getUserList: () => {
    return axiosClient.get("/UserManagement/GetUserList")
  },
  registerUser: (user) => {
    return axiosClient.post("/UserManagement/RegisterUser", user)
  },
  updateUser: (user) => {
    console.log("user in updateuser:",user);
    return axiosClient.put("/UserManagement/UpdateUser", user)
  },
  deleteUser: (id) => {
    return axiosClient.delete(`/UserManagement/DeleteUser/${id}`)
  }
};

export default usersApi;
