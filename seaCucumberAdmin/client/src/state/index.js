import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  mode: "dark",
  userId: Cookies.get("userId") || null, // Retrieve userId from cookie if available
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      Cookies.set("userId", action.payload); // Set userId in cookie
    },
  },
});

export const { setMode, setUserId } = globalSlice.actions;

export default globalSlice.reducer;
