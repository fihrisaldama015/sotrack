import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platformId: "2455d96c-71ff-48ee-8e18-62df8ad2f7c7",
};

export const PlatformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {
    changePlatformId: (state, action) => {
      state.platformId = action.payload.platformId;
    },
  },
});

export const { changePlatformId } = PlatformSlice.actions;

export default PlatformSlice.reducer;
