import axiosClient from "./axiosClient";

const projectApi = {
  getProjectList: () => {
    return axiosClient.post("/Project/GetProjectList")
  },
  createProject: (project) => {
    return axiosClient.post("/Project/CreateProject", project)
  },
  updateProject: (project) => {
    console.log("project update:", project);
    return axiosClient.put("/Project/UpdateProject", project)
  },
  deleteProject: (project) => {
    return axiosClient.delete("/Project/DeleteProject", {
      data: project
    });
  }
};

export default projectApi;
