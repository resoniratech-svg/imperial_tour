import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Tour, TourCategory } from '../../types';
import { tourService, categoryService } from '../../services/api';
import { FALLBACK_CATEGORIES, FALLBACK_TOURS } from '../../data/fallbackData';

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
  tours: FALLBACK_TOURS,
  total: FALLBACK_TOURS.length,
  featuredTours: FALLBACK_TOURS.filter((t) => t.isFeatured),
  categories: FALLBACK_CATEGORIES,
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
        if (action.payload && Array.isArray(action.payload.tours) && action.payload.tours.length > 0) {
          state.tours = action.payload.tours;
          state.total = action.payload.total || action.payload.tours.length;
          state.featuredTours = action.payload.tours.filter((t) => t.isFeatured);
        }
      })
      .addCase(fetchPublicTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tours';
        // Keep fallback data so UI never breaks
        if (!state.tours || state.tours.length === 0) {
          state.tours = FALLBACK_TOURS;
          state.total = FALLBACK_TOURS.length;
          state.featuredTours = FALLBACK_TOURS.filter((t) => t.isFeatured);
        }
      })
      // fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<TourCategory[]>) => {
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.categories = action.payload;
        }
      })
      .addCase(fetchCategories.rejected, (state) => {
        if (!state.categories || state.categories.length === 0) {
          state.categories = FALLBACK_CATEGORIES;
        }
      })
      // fetchTourBySlug
      .addCase(fetchTourBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTourBySlug.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.tour) {
          state.currentTour = action.payload.tour;
          state.similarTours = action.payload.similarTours || [];
        }
      })
      .addCase(fetchTourBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tour';
        const slug = action.meta.arg;
        const fallback = FALLBACK_TOURS.find((t) => t.slug === slug);
        if (fallback) {
          state.currentTour = fallback;
          state.similarTours = FALLBACK_TOURS.filter(
            (t) => t.categoryId === fallback.categoryId && t.id !== fallback.id
          ).slice(0, 3);
        }
      });
  },
});

export const { clearCurrentTour } = tourSlice.actions;
export default tourSlice.reducer;
