import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mediaBroadcastData: [],
};

export const MediaBroadcastDataSlice = createSlice({
  name: "mediaBroadcastData",
  initialState,
  reducers: {
    changeMediaBroadcastData: (state, action) => {
      state.mediaBroadcastData = action.payload.mediaBroadcastData;
    },
  },
});

export const { changeMediaBroadcastData } = MediaBroadcastDataSlice.actions;

export default MediaBroadcastDataSlice.reducer;
