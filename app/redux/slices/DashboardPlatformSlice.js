import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platformSelected: "News",
  platformSelectedId: "f50a94f8-2ccc-449b-bf2d-7b2809fe72f8",
};

export const DashboardPlatformSlice = createSlice({
  name: "DashboardPlatform",
  initialState,
  reducers: {
    changeDashboardPlatform: (state, action) => {
      state.platformSelected = action.payload.platformSelected;
      state.platformSelectedId = action.payload.platformSelectedId;
    },
  },
});

export const { changeDashboardPlatform } = DashboardPlatformSlice.actions;

export default DashboardPlatformSlice.reducer;
