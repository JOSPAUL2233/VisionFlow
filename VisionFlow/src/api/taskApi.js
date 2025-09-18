import axiosClient from "./axiosClient";

const taskApi = {
  getTaskListByPid: (id) => {
    return axiosClient.post("/Task/GetTaskListByPid",id)
  },
  getTaskListByUid: () => {
    return axiosClient.post("/Task/GetTaskListByUid")
  },
  createTask: (task) => {
    return axiosClient.post("/Task/CreateTask", task)
  },
  updateTask: (task) => {
    console.log("insdie update task api file:TASK- ",task)
    return axiosClient.put("/Task/UpdateTask", task)
  },
  deleteTask: (task) => {
    return axiosClient.delete("/Task/DeleteTask", {
      data: task
    });
  }
};

export default taskApi;
