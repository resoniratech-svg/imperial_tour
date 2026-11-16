import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TourAddon } from '../../types';

interface BookingDraft {
  tourId: string;
  tourTitle: string;
  travelDate: string;
  numberOfGuests: number;
  selectedAddons: Array<{ addon: TourAddon; quantity: number }>;
}

interface BookingState {
  draft: BookingDraft | null;
  lastBookingRef: string | null;
}

const initialState: BookingState = {
  draft: null,
  lastBookingRef: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDraft: (state, action: PayloadAction<BookingDraft>) => {
      state.draft = action.payload;
    },
    clearBookingDraft: (state) => {
      state.draft = null;
    },
    setLastBookingRef: (state, action: PayloadAction<string>) => {
      state.lastBookingRef = action.payload;
    },
  },
});

export const { setBookingDraft, clearBookingDraft, setLastBookingRef } = bookingSlice.actions;
export default bookingSlice.reducer;
