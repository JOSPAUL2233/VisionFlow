import axiosClient from "./axiosClient";

const projectApi = {
  getProjectList: () => {
    return axiosClient.post("/Project/GetProjectList","1")
  },
  createProject: (project) => {
    return axiosClient.post("/Project/CreateProject", project)
  },
  updateProject: (project) => {
    return axiosClient.put("/Project/UpdateProject", project)
  },
  deleteProject: (project) => {
    console.log("project del:", project);
    return axiosClient.delete("/Project/DeleteProject", {
      data: project
    });
  }
};

export default projectApi;
