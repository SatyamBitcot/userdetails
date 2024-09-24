import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersCases, deleteUsersCases, addUserCases, editUserCases, loginUserCases } from "../utils/userExtraReducers";

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    users: [],
    error: null,
    loader: false,
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token'); 
    },
  },
  extraReducers: (builder) => {
    fetchUsersCases(builder);
    deleteUsersCases(builder);
    addUserCases(builder);
    editUserCases(builder);
    loginUserCases(builder)
    
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
