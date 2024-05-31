import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mostDiscusedLatelyData: [],
  mentionSourceData: [],
  criminalReportData: [],
  crimeStatisticData: [],
  sentigraphData: {},
  socialMentionData: [],
  mentionAnalyticsData: [],
};

export const DashboardDataSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {
    changeDashboardMostDiscusedLately: (state, action) => {
      state.mostDiscusedLatelyData = action.payload.mostDiscusedLatelyData;
    },
    changeDashboardMentionSource: (state, action) => {
      state.mentionSourceData = action.payload.mentionSourceData;
    },
    changeDashboardCriminalReport: (state, action) => {
      state.criminalReportData = action.payload.criminalReportData;
    },
    changeDashboardCrimeStatistic: (state, action) => {
      state.crimeStatisticData = action.payload.crimeStatisticData;
    },
    changeDashboardSentigraph: (state, action) => {
      state.sentigraphData = action.payload.sentigraphData;
    },
    changeDashboardSocialMention: (state, action) => {
      state.socialMentionData = action.payload.socialMentionData;
    },
    changeDashboardMentionAnalytics: (state, action) => {
      state.mentionAnalyticsData = action.payload.mentionAnalyticsData;
    },
  },
});

export const {
  changeDashboardMostDiscusedLately,
  changeDashboardMentionSource,
  changeDashboardCriminalReport,
  changeDashboardCrimeStatistic,
  changeDashboardMentionAnalytics,
  changeDashboardSentigraph,
  changeDashboardSocialMention,
} = DashboardDataSlice.actions;

export default DashboardDataSlice.reducer;
