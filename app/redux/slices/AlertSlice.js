import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAlertOpen: false,
  action: null,
};

export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    changeIsAlertOpen: (state, action) => {
      state.isAlertOpen = action.payload.isAlertOpen;
      state.action = action.payload.action;
    },
  },
});

export const { changeIsAlertOpen } = AlertSlice.actions;

export default AlertSlice.reducer;
