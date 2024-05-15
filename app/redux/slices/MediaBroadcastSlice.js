import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailSelected: [],
};

export const ModalSlice = createSlice({
  name: "Broadcast",
  initialState,
  reducers: {
    changeEmailSelected: (state, action) => {
      state.emailSelected = action.payload.emailSelected;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeEmailSelected } = ModalSlice.actions;

export default ModalSlice.reducer;
