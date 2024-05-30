import { configureStore } from "@reduxjs/toolkit";
import {
  AlertSlice,
  DashboardOptionsSlice,
  DashboardPlatformSlice,
  FacebookPageSlice,
  FilterSlice,
  LoginSlice,
  MediaBroadcastSlice,
  ModalSlice,
  PlatformSlice,
  PopupSlice,
  TimelineDataSlice,
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
    dashboardOptionsReducer: DashboardOptionsSlice,
    timelineDataReducer: TimelineDataSlice,
  },
});
