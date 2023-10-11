import { AlertColor } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface NotificationState {
    notifications: Notification[];
}

export interface Notification {
    id?: string;
    type: AlertColor; // 'success' | 'info' | 'warning' | 'error';
    header?: string;
    message: string;
    timeout?: number;
    actionButton?: ReactNode;
}

const notificationInitialState: NotificationState = {
    notifications: [],
};

const NotificationSlice = createSlice({
    name: "notification",
    initialState: notificationInitialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push({ ...action.payload, id: Date.now().toString() });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            );
        },
    },
});

export const selectNotificationsCount = (state: NotificationState) => state.notifications.length;
export const NotificationActions = NotificationSlice.actions;
export const NotificationReducer = NotificationSlice.reducer;
