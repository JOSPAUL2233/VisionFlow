import axiosClient from "./axiosClient";

const usersApi = {
  getProjectList: () => {
    return axiosClient.get("/Project/GetProjectList")
  },
  createProject: (project) => {
    return axiosClient.post("/Project/CreateProject", project)
  },
  updateProject: (project) => {
    return axiosClient.put("/Project/UpdateProject", project)
  },
  deleteProject: (id) => {
    return axiosClient.delete(`/Project/DeleteProject/${id}`)
  }
};

export default usersApi;
