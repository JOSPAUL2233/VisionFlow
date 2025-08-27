import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/UserSlice"

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
