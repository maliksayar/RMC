import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Lock, LogIn, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, isAdmin, openAuthModal } = useApp();

  // 1. If not logged in at all, render clean clinical access card with direct Sign-In button
  if (!currentUser) {
    const isTargetingAdmin = Boolean(
      allowedRoles && (allowedRoles.includes('admin') || allowedRoles.includes('psychologist'))
    );

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-neutral-200 rounded-2xl p-8 shadow-xl text-center space-y-5 animate-in fade-in">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 border border-neutral-200">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Access Restricted
            </span>
            <h2 className="text-xl font-serif font-bold text-neutral-950">
              {isTargetingAdmin ? 'Admin Authentication Required' : 'Patient Authentication Required'}
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
              Please sign in to access your clinical portal. You will be automatically directed based on your account role.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => openAuthModal('signin')}
              className="flex-1 py-3 px-4 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In Now</span>
            </button>
            <Link
              to="/"
              className="py-3 px-4 border border-neutral-300 text-neutral-700 hover:border-black rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
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
