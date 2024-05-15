import { configureStore } from "@reduxjs/toolkit";
import {
  FilterSlice,
  LoginSlice,
  ModalSlice,
  PlatformSlice,
  PopupSlice,
  FacebookPageSlice,
  MediaBroadcastSlice,
} from "./slices";

export const Store = configureStore({
  reducer: {
    modalReducer: ModalSlice,
    loginReducer: LoginSlice,
    popupReducer: PopupSlice,
    platformReducer: PlatformSlice,
    filterReducer: FilterSlice,
    facebookReducer: FacebookPageSlice,
    mediaReducer: MediaBroadcastSlice,
  },
});
