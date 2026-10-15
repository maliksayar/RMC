import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Lock, User as UserIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole, isUserAdmin } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, role, isAdmin, openAuthModal } = useApp();

  // 1. If not logged in at all
  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center text-neutral-800">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-neutral-900">
            Authentication Required
          </h2>
          <p className="text-sm text-neutral-600 max-w-md mx-auto">
            Please log in or register to access this clinical portal.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => openAuthModal('signin')}
            className="px-6 py-2.5 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-xs"
          >
            Log In Now
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('signup')}
            className="px-6 py-2.5 border border-neutral-300 hover:border-black rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Register Account
          </button>
        </div>
      </div>
    );
  }

  // 2. If route requires Admin / Doctor, but current user is a patient
  if (allowedRoles && allowedRoles.some((r) => r === 'admin' || r === 'psychologist') && !isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">
            Access Restricted · Doctor / Admin Portal
          </span>
          <h2 className="font-serif text-3xl font-bold text-neutral-900 mt-2">
            Restricted to Clinic Administration
          </h2>
          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            You are currently signed in as <strong>{currentUser.name}</strong> (Patient). Patients can only access the Patient Portal and public resources. Clinical administration, PIN issuance, and appointment management are reserved for the doctor.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/patient-portal"
            className="w-full sm:w-auto px-6 py-2.5 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            <UserIcon className="w-4 h-4" />
            <span>Go to Patient Portal</span>
          </Link>

          <button
            type="button"
            onClick={() => openAuthModal('signin')}
            className="w-full sm:w-auto px-6 py-2.5 border border-neutral-300 hover:border-black rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Switch to Doctor Account
          </button>
        </div>
      </div>
    );
  }

  // 3. Authorized!
  return <>{children}</>;
};
