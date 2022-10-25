import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  AppContextInterface,
  ProtectedInterface,
  UserInterface,
} from '../interface/App';

export const Protected: React.FC<ProtectedInterface> = () => {
  return localStorage.getItem('accessToken') ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export const ProtectedLogin: React.FC<ProtectedInterface> = () => {
  return !localStorage.getItem('accessToken') ? (
    <Outlet />
  ) : (
    <Navigate to={'/my-articles'} />
  );
};
