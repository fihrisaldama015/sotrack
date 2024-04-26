import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  facebookPageList: [],
};

export const FacebookPageSlice = createSlice({
  name: "facebookPage",
  initialState,
  reducers: {
    changeFacebookPageList: (state, action) => {
      state.facebookPageList = action.payload.facebookPageList;
    },
  },
});

export const { changeFacebookPageList } = FacebookPageSlice.actions;

export default FacebookPageSlice.reducer;
