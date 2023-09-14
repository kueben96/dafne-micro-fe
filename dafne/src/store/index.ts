import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const store = configureStore({
    reducer: {
        // Add your API reducer to the store
        [apiSlice.reducerPath]: apiSlice.reducer,
        // Add other reducers if needed
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

// Export types for RTK Query
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store for use in your app
export default store;


