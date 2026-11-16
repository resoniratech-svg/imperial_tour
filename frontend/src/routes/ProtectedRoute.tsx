import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { authService } from '../services/api';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const hasToken = authService.isAuthenticated();

  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
