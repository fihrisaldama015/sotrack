import { configureStore } from "@reduxjs/toolkit";
import {
  AlertSlice,
  DashboardDataSlice,
  DashboardOptionsSlice,
  FacebookPageSlice,
  FilterSlice,
  LoginSlice,
  MediaBroadcastSlice,
  ModalSlice,
  PlatformSlice,
  PopupSlice,
  TimelineDataSlice,
  PublicReportDataSlice,
  MediaBroadcastDataSlice,
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
    alertReducer: AlertSlice,
    dashboardOptionsReducer: DashboardOptionsSlice,
    dashboardDataReducer: DashboardDataSlice,
    timelineDataReducer: TimelineDataSlice,
    publicReportDataReducer: PublicReportDataSlice,
    mediaBroadcastDataReducer: MediaBroadcastDataSlice,
  },
});
