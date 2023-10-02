import { configureStore } from '@reduxjs/toolkit';
import { apiGatewaySlice } from './apiGatewaySlice';
import userReducer from './features/userSlice';
import jobsReducer from './features/jobsSlice';
import { NotificationReducer } from './features/notificationsSlice';

export const store = configureStore({
    reducer: {
        // Add your API reducer to the store
        [apiGatewaySlice.reducerPath]: apiGatewaySlice.reducer,
        user: userReducer,
        jobs: jobsReducer,
        notification: NotificationReducer

        // Add other reducers if needed
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiGatewaySlice.middleware),
    devTools: true
});

// Export types for RTK Query
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store for use in your app
export default store;


