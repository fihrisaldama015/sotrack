import { configureStore } from "@reduxjs/toolkit";
import {
  AlertSlice,
  DashboardPlatformSlice,
  FacebookPageSlice,
  FilterSlice,
  LoginSlice,
  MediaBroadcastSlice,
  ModalSlice,
  PlatformSlice,
  PopupSlice,
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
    dashboardReducer: DashboardPlatformSlice,
    alertReducer: AlertSlice,
  },
});
