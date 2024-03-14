import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platformId: "6a8bf110-ccbc-48c8-834e-d11ac581197a",
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
