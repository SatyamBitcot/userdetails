import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicLayout = () => {
  const token = useSelector((state) => state.user.token);

 
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicLayout;
