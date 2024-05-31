import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publicReportData: [],
};

export const PublicReportDataSlice = createSlice({
  name: "publicReportData",
  initialState,
  reducers: {
    changePublicReportData: (state, action) => {
      state.publicReportData = action.payload.publicReportData;
    },
  },
});

export const { changePublicReportData } = PublicReportDataSlice.actions;

export default PublicReportDataSlice.reducer;
