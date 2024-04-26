import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterData: {},
};

export const FilterSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {
    changeFilterData: (state, action) => {
      state.filterData = action.payload.filterData;
    },
  },
});

export const { changeFilterData } = FilterSlice.actions;

export default FilterSlice.reducer;
