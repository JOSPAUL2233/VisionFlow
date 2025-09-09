import { createSlice } from "@reduxjs/toolkit";

export const initialTask = {
  taskId: 0,
  taskName: "",
  description: "",
  deadline: "",
  status: 1,
  statusDesc:"",
  assignedBy: 0,
  assignedByDesc: "",
  assignedTo: 0,
  assignedToDesc: "",
  projectId: 0,
  projectDesc: "",
  userId: 0,
  roleId: 0,
  returnId: 0  
};

const initialTaskState = {
  currTask: initialTask,
  onEdit: false
};

const TaskSlice = createSlice({
  name: "task",
  initialState: initialTaskState,
  reducers: {
    setField: (state, action) => {
      const { name, value } = action.payload;
      state.currTask[name] = value;
    },
    setCurrTask: (state, action) => {
      state.currTask = action.payload;
    },
    resetCurrTask: (state) => {
      //---resetting everything keeping the project id same---
      const pid = state.currTask.projectId;
      state.currTask = { ...initialTask };
      state.currTask.projectId = pid;
      state.onEdit = false;
    },
    setOnEdit: (state, action) => {
      state.onEdit = action.payload;
    }
    // setProjectId: (state,action) => {
    //     state.projectId = action.payload;
    // }
  },
});

export const { setField, setCurrTask, resetCurrTask, setOnEdit,setProjectId } = TaskSlice.actions;
export default TaskSlice.reducer;