import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/UserSlice"
import ProjectReducer from "../features/project/ProjectSlice"

export const store = configureStore({
  reducer: {
    user: UserReducer,
    project: ProjectReducer,
  },
});

export default store;
