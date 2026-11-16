import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminUser } from '../../types';
import { authService } from '../../services/api';

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialUser = authService.getCurrentUser();
const initialToken = localStorage.getItem('itq_admin_token');

const initialState: AuthState = {
  user: initialUser,
  token: initialToken,
  isAuthenticated: !!initialToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AdminUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      authService.logout();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
