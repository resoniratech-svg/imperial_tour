import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tourReducer from './slices/tourSlice';
import bookingReducer from './slices/bookingSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tours: tourReducer,
    bookings: bookingReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
