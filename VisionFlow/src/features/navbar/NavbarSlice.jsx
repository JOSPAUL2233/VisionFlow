import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navItems: [], // array to store navbar items
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavItems: (state, action) => {
      state.navItems = action.payload;
    },
    clearNavItems: (state) => {
      state.navItems = [];
    },
  },
});

export const { setNavItems, clearNavItems } = navbarSlice.actions;
export default navbarSlice.reducer;