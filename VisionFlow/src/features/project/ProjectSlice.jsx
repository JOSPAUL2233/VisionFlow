import { createSlice } from "@reduxjs/toolkit";

const initialProject = {
  projectId: 0,
  projectName: "",
  description: "",
  deadline: "", // keep deadline as string (ISO format)
  status: 1,
  assigned_by: 0,
  assigned_to: 0,
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
