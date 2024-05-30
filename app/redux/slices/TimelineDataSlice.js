import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timelineData: [],
  selectedPlatform: "news",
  selectedPlatformId: "c3751388-805f-49e1-a4f2-33151e454047",
};

export const TimelineDataSlice = createSlice({
  name: "timelineData",
  initialState,
  reducers: {
    changeTimelineData: (state, action) => {
      state.timelineData = action.payload.timelineData;
    },
    changeTimelineOptions: (state, action) => {
      state.selectedPlatform = action.payload.selectedPlatform;
      state.selectedPlatformId = action.payload.selectedPlatformId;
    },
  },
});

export const { changeTimelineData, changeTimelineOptions } =
  TimelineDataSlice.actions;

export default TimelineDataSlice.reducer;
