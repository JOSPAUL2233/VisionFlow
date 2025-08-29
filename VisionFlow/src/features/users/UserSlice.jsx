import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  loginName: "",
  firstName: "",
  lastName: "",
  phoneNo: "",
  mailId: "",
  password: "",
  userRoleId:0,
  userId: 0,
  roleId: 0,
  returnId: 0,
};

const initialUserState = {
  currUser: initialUser,
  onEdit: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setField: (state, action) => {
      const { name, value } = action.payload;
      state.currUser[name] = value;
    },
    setCurrUser: (state, action) => {
      state.currUser = action.payload;
    },
    resetCurrUser: (state) => {
      state.currUser = { ...initialUser };
      state.onEdit = false;
    },
    setOnEdit: (state, action) => {
      state.onEdit = action.payload;
    },
  },
});

export const { setField, setCurrUser, resetCurrUser, setOnEdit } =
  UserSlice.actions;
export default UserSlice.reducer;
