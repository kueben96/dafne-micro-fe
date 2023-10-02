import { AlertColor } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface NotificationState {
    open?: boolean;
    type?: AlertColor;// 'success' | 'info' | 'warning' | 'error';
    header?: string;
    message?: string;
    timeout?: number;
    actionButton?: ReactNode;
}

export const notificationInitialState: NotificationState = {
    open: false,
    type: "info",
    message: "",
    timeout: 100000,
    actionButton: null
};

export const NotificationSlice = createSlice({
    name: "notification",
    initialState: notificationInitialState,
    reducers: {
        addNotification: (_state, action: PayloadAction<NotificationState>) => ({
            ...notificationInitialState,
            ...action.payload,
            open: true
        }),
        clearNotification: (state) => ({ ...state, open: false })
    }
});

export const NotificationActions = NotificationSlice.actions;
export const NotificationReducer = NotificationSlice.reducer;