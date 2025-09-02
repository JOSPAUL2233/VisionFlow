import axiosClient from "./axiosClient";

const projectApi = {
  getProjectList: () => {
    return axiosClient.post("/Project/GetProjectList","1")
  },
  createProject: (project) => {
    console.log("project:",project);
    return axiosClient.post("/Project/CreateProject", project)
  },
  updateProject: (project) => {
    return axiosClient.put("/Project/UpdateProject", project)
  },
  deleteProject: (id) => {
    return axiosClient.delete(`/Project/DeleteProject/${id}`)
  }
};

export default projectApi;
