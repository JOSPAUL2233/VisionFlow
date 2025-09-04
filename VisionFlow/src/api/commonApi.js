import axiosClient from "./axiosClient";

const commonApi = {
  getRoles: () => {
    return axiosClient.get("/Common/GetRoles")
  },
  getProjectStatusList: () => {
    return axiosClient.get("/Common/GetProjectStatusList")
  },  
  getAssignedToList: () => {
    return axiosClient.post("/Common/GetAssignedToList",{
    "userId": 1,
    "roleId": 2
  }
)
  }
};

export default commonApi;
