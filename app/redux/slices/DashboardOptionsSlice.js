import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  platformSelected: "News",
  platformSelectedId: "f50a94f8-2ccc-449b-bf2d-7b2809fe72f8",
  sourceTrackerStartDate: dayjs().date(1),
  sourceTrackerEndDate: dayjs(),
  mostDiscusedLatelyStartDate: dayjs().date(0),
  mostDiscusedLatelyEndDate: dayjs(),
  criminalReportTimeRange: "monthly",
  crimeStatisticStartDate: dayjs().date(0),
  crimeStatisticEndDate: dayjs(),
  sentigraphStartDate: dayjs().date(0),
  sentigraphEndDate: dayjs(),
  mentionAnalyticsTimeRange: "monthly",
};

export const DashboardOptionsSlice = createSlice({
  name: "dashboardOptions",
  initialState,
  reducers: {
    changeDashboardOptions: (state, action) => {
      state.sourceTrackerStartDate = action.payload.sourceTrackerStartDate;
      state.sourceTrackerEndDate = action.payload.sourceTrackerEndDate;
    },
    changeDashboardPlatform: (state, action) => {
      state.platformSelected = action.payload.platformSelected;
      state.platformSelectedId = action.payload.platformSelectedId;
    },
    changeDashboardMostDiscusedLatelyOptions: (state, action) => {
      state.mostDiscusedLatelyStartDate =
        action.payload.mostDiscusedLatelyStartDate;
      state.mostDiscusedLatelyEndDate =
        action.payload.mostDiscusedLatelyEndDate;
    },
    changeDashboardCriminalReportOptions: (state, action) => {
      state.criminalReportTimeRange = action.payload.criminalReportTimeRange;
    },
    changeDashboardCrimeStatisticOptions: (state, action) => {
      state.crimeStatisticStartDate = action.payload.crimeStatisticStartDate;
      state.crimeStatisticEndDate = action.payload.crimeStatisticEndDate;
    },
    changeDashboardSentigraphOptions: (state, action) => {
      state.sentigraphStartDate = action.payload.sentigraphStartDate;
      state.sentigraphEndDate = action.payload.sentigraphEndDate;
    },
    changeDashboardMentionAnalyticsOptions: (state, action) => {
      state.mentionAnalyticsTimeRange =
        action.payload.mentionAnalyticsTimeRange;
    },
  },
});

export const {
  changeDashboardOptions,
  changeDashboardPlatform,
  changeDashboardCrimeStatisticOptions,
  changeDashboardCriminalReportOptions,
  changeDashboardMentionAnalyticsOptions,
  changeDashboardMostDiscusedLatelyOptions,
  changeDashboardSentigraphOptions,
} = DashboardOptionsSlice.actions;

export default DashboardOptionsSlice.reducer;
