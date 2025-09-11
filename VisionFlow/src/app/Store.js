import { configureStore } from "@reduxjs/toolkit"
import UserReducer from "../features/users/UserSlice"
import ProjectReducer from "../features/project/ProjectSlice"
import TaskReducer from "../features/task/TaskSlice"
import AuthReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    project: ProjectReducer,
    task: TaskReducer,
  },
});

export default store;
