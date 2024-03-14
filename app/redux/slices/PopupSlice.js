import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPopUpOpen: false,
  popUpMessage: "",
  popUpType: "",
};

export const PopUpSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    changeIsPopUpOpen: (state, action) => {
      state.isPopUpOpen = action.payload.isPopUpOpen;
      state.popUpMessage = action.payload.popUpMessage;
      state.popUpType = action.payload.popUpType;
    },
  },
});

export const { changeIsPopUpOpen } = PopUpSlice.actions;

export default PopUpSlice.reducer;
