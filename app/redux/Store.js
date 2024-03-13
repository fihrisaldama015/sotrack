import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice, ModalSlice } from "./slices";

export const Store = configureStore({
  reducer: {
    modalReducer: ModalSlice,
    loginReducer: LoginSlice,
  },
});
