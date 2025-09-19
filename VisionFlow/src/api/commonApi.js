import axiosClient from "./axiosClient";

const commonApi = {
  getRoles: () => {
    return axiosClient.get("/Common/GetRoles")
  },
  getProjectStatusList: () => {
    return axiosClient.get("/Common/GetProjectStatusList")
  },  
  getTaskStatusList: () => {
    return axiosClient.get("/Common/GetTaskStatusList")
  },  
  getAssignedToList: () => {
    return axiosClient.post("/Common/GetAssignedToList")
  },
  getNavbarList : (user) => {
    return axiosClient.post("/Common/GetNavbarList",user)
  }
};

export default commonApi;
