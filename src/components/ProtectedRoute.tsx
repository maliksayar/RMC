import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, isAdmin } = useApp();

  // 1. If not logged in at all, silently redirect to home and open auth modal
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // 2. Admin can see EVERYTHING across the software (both admin and patient sides)
  if (isAdmin) {
    return <>{children}</>;
  }

  // 3. If a patient tries to access an admin-only route (/admin), silently redirect to /patient-portal
  if (allowedRoles && allowedRoles.includes('admin') && !isAdmin) {
    return <Navigate to="/patient-portal" replace />;
  }

  // 4. Authorized patient access
  return <>{children}</>;
};
