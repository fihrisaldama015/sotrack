import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  sourceTrackerStartDate: dayjs().date(1),
  sourceTrackerEndDate: dayjs(),
};

export const DashboardOptionsSlice = createSlice({
  name: "dashboardOptions",
  initialState,
  reducers: {
    changeDashboardOptions: (state, action) => {
      state.sourceTrackerStartDate = action.payload.sourceTrackerStartDate;
      state.sourceTrackerEndDate = action.payload.sourceTrackerEndDate;
    },
  },
});

export const { changeDashboardOptions } = DashboardOptionsSlice.actions;

export default DashboardOptionsSlice.reducer;
