import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';

const PrivateLayout = () => {
  const token = useSelector((state) => state.user.token); 

  return (
<>
      <Navbar/>
     { token ? <Outlet /> : <Navigate to="/" />}
</>
    )
};

export default PrivateLayout;
