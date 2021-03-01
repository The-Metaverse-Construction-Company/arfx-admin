import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationData } from "../../models/Notification";

type SettingsState = {
  notifications: NotificationData[];
};

const initialState = {
  notifications: [],
} as SettingsState;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NotificationData>) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } = settingsSlice.actions;

export default settingsSlice.reducer;
