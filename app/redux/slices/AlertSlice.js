import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAlertOpen: false,
  action: null,
  title: "",
  message: "",
};

export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    changeIsAlertOpen: (state, action) => {
      state.isAlertOpen = action.payload.isAlertOpen;
      state.action = action.payload.action;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
  },
});

export const { changeIsAlertOpen } = AlertSlice.actions;

export default AlertSlice.reducer;
