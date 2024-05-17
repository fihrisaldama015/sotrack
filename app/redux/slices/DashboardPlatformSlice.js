import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platformSelected: "News",
};

export const DashboardPlatformSlice = createSlice({
  name: "DashboardPlatform",
  initialState,
  reducers: {
    changeDashboardPlatform: (state, action) => {
      state.platformSelected = action.payload.platformSelected;
    },
  },
});

export const { changeDashboardPlatform } = DashboardPlatformSlice.actions;

export default DashboardPlatformSlice.reducer;
