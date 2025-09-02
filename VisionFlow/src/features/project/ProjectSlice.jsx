import { createSlice } from "@reduxjs/toolkit";

export const initialProject = {
  projectId: 0,
  projectName: "",
  description: "",
  deadline: "",
  status: 1,
  statusDesc:"",
  assignedBy: 0,
  assignedByDesc: "",
  assignedTo: 0,
  assignedToDesc: "",
  userId: 0,
  roleId: 0,
  returnId: 0,  
};

const initialProjectState = {
  currProject: initialProject,
  onEdit: false,
};

const ProjectSlice = createSlice({
  name: "project",
  initialState: initialProjectState,
  reducers: {
    setField: (state, action) => {
      const { name, value } = action.payload;
      state.currProject[name] = value;
    },
    setCurrProject: (state, action) => {
      state.currProject = action.payload;
    },
    resetCurrProject: (state) => {
      state.currProject = { ...initialProject };
      state.onEdit = false;
    },
    setOnEdit: (state, action) => {
      state.onEdit = action.payload;
    },
  },
});

export const { setField, setCurrProject, resetCurrProject, setOnEdit } =
  ProjectSlice.actions;
export default ProjectSlice.reducer;
