// src/Components/Layout/Layout.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Layout;
