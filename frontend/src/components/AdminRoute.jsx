import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const isAdminAuthenticated = () => {
    return localStorage.getItem('admin_token') !== null;
  };

  return isAdminAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default AdminRoute;
