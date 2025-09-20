import axiosClient from "./axiosClient";

const commonApi = {
  getRoles: () => {
    return axiosClient.get("/Common/GetRoles")
  },
  getProjectStatusList: (projectId) => {
    return axiosClient.get("/Common/GetProjectStatusList", {
      params: { projectId }
    })
  },
  getTaskStatusList: (taskId) => {
    return axiosClient.get("/Common/GetTaskStatusList",{
      params: {taskId}
    })
  },  
  getAssignedToList: () => {
    return axiosClient.post("/Common/GetAssignedToList")
  },
  getNavbarList : (user) => {         
    return axiosClient.post("/Common/GetNavbarList",user)
  }
};

export default commonApi;
