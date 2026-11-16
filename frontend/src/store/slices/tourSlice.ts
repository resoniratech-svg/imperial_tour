import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Tour, TourCategory } from '../../types';
import { tourService, categoryService } from '../../services/api';

interface TourState {
  tours: Tour[];
  total: number;
  featuredTours: Tour[];
  categories: TourCategory[];
  currentTour: Tour | null;
  similarTours: Tour[];
  loading: boolean;
  error: string | null;
}

const initialState: TourState = {
  tours: [],
  total: 0,
  featuredTours: [],
  categories: [],
  currentTour: null,
  similarTours: [],
  loading: false,
  error: null,
};

export const fetchPublicTours = createAsyncThunk(
  'tours/fetchPublicTours',
  async (params?: { category?: string; featured?: boolean; search?: string }) => {
    return await tourService.getPublicTours(params);
  }
);

export const fetchCategories = createAsyncThunk(
  'tours/fetchCategories',
  async () => {
    return await categoryService.getPublicCategories();
  }
);

export const fetchTourBySlug = createAsyncThunk(
  'tours/fetchTourBySlug',
  async (slug: string) => {
    return await tourService.getTourBySlug(slug);
  }
);

const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    clearCurrentTour: (state) => {
      state.currentTour = null;
      state.similarTours = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPublicTours
      .addCase(fetchPublicTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload.tours;
        state.total = action.payload.total;
        state.featuredTours = action.payload.tours.filter((t) => t.isFeatured);
      })
      .addCase(fetchPublicTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tours';
      })
      // fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<TourCategory[]>) => {
        state.categories = action.payload;
      })
      // fetchTourBySlug
      .addCase(fetchTourBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTourBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTour = action.payload.tour;
        state.similarTours = action.payload.similarTours;
      })
      .addCase(fetchTourBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tour';
      });
  },
});

export const { clearCurrentTour } = tourSlice.actions;
export default tourSlice.reducer;
