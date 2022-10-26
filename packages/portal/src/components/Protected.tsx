import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ProtectedInterface } from '../interface/App';

export const Protected: React.FC<ProtectedInterface> = () => {
  return localStorage.getItem('accessToken') ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export const Public: React.FC<ProtectedInterface> = () => {
  return !localStorage.getItem('accessToken') ? (
    <Outlet />
  ) : (
    <Navigate to={localStorage.getItem('link') as unknown as string} />
  );
};
