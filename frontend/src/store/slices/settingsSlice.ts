import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WebsiteSettings } from '../../types';
import { contentService } from '../../services/api';

interface SettingsState {
  settings: WebsiteSettings;
  loading: boolean;
  language: 'en' | 'ar';
}

const initialState: SettingsState = {
  settings: {
    site_name: 'Imperial Tours Qatar',
    site_tagline: 'Discover Qatar With Imperial Tours',
    currency: 'QAR',
    currency_symbol: 'QAR',
    phone: '',
    email: 'info@imperialhospitality.com.qa',
    address: '',
    whatsapp: '',
  },
  loading: false,
  language: 'en',
};

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async () => {
    return await contentService.getSettings();
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    });
  },
});

export const { setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
