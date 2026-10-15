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

  // 1. If not logged in at all, silently redirect to home
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // 2. If user is Admin and route is patient-only (/patient-portal), redirect to /admin
  const isPatientOnlyRoute = Boolean(
    allowedRoles && !allowedRoles.includes('admin') && !allowedRoles.includes('psychologist')
  );
  if (isAdmin && isPatientOnlyRoute) {
    return <Navigate to="/admin" replace />;
  }

  // 3. If user is Patient and tries to access an admin-only route (/admin), redirect to /patient-portal
  const isAdminOnlyRoute = Boolean(
    allowedRoles && (allowedRoles.includes('admin') || allowedRoles.includes('psychologist'))
  );
  if (!isAdmin && isAdminOnlyRoute) {
    return <Navigate to="/patient-portal" replace />;
  }

  // 4. Authorized access
  return <>{children}</>;
};
