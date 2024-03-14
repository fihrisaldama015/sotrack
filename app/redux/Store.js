import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice, ModalSlice, PlatformSlice, PopupSlice } from "./slices";

export const Store = configureStore({
  reducer: {
    modalReducer: ModalSlice,
    loginReducer: LoginSlice,
    popupReducer: PopupSlice,
    platformReducer: PlatformSlice,
  },
});
