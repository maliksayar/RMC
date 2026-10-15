import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Database,
  Info,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { User } from '../types';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    currentUser,
    loginWithSupabase,
    signUpWithSupabase,
    logout,
    loginAs,
    isAdmin
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [authModalMode, authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (authModalMode === 'signin') {
        // Sign In (For Doctor or Patient)
        if (isSupabaseConfigured) {
          const result = await loginWithSupabase(email.trim(), password);
          if (!result.success) {
            setErrorMsg(result.message || 'Failed to sign in. Please check your email and password.');
          } else {
            setSuccessMsg('Signed in successfully!');
            setTimeout(() => setAuthModalOpen(false), 800);
          }
        } else {
          // Local offline fallback login
          const cleanEmail = email.trim().toLowerCase();
          const isDoctorEmail =
            cleanEmail.includes('doctor') ||
            cleanEmail.includes('admin') ||
            cleanEmail === 'doctor@realitymindclinic.com' ||
            cleanEmail === 'clinic@realitymind.com';

          if (isDoctorEmail) {
            loginAs({
              id: 'doctor-lead',
              name: 'Dr. Malik Sayar (Doctor Admin)',
              email: cleanEmail,
              phone: '+91 6005754205',
              role: 'admin',
              createdAt: '2026-01-01'
            });
            setSuccessMsg('Signed in as Clinic Doctor (Admin Panel Unlocked)');
          } else {
            loginAs({
              id: `pat-${Date.now()}`,
              name: name || 'Registered Patient',
              email: cleanEmail,
              phone: phone || '+91 6005754205',
              role: 'patient',
              createdAt: new Date().toISOString()
            });
            setSuccessMsg('Signed in as Patient (Patient Portal Active)');
          }
          setTimeout(() => setAuthModalOpen(false), 800);
        }
      } else {
        // Registration (Strictly for Patients only)
        if (!name.trim()) {
          setErrorMsg('Please enter your full name.');
          setLoading(false);
          return;
        }

        if (isSupabaseConfigured) {
          const result = await signUpWithSupabase({
            email: email.trim(),
            password,
            name: name.trim(),
            phone: phone.trim(),
            role: 'patient' // Always patient
          });

          if (!result.success) {
            setErrorMsg(result.message || 'Failed to create patient account.');
          } else {
            setSuccessMsg(
              result.message || 'Patient account created! Check your email if verification is required.'
            );
            setTimeout(() => setAuthModalOpen(false), 1200);
          }
        } else {
          // Local offline fallback registration
          const newPatient: User = {
            id: `pat-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || '+91 6005754205',
            role: 'patient',
            createdAt: new Date().toISOString()
          };
          loginAs(newPatient);
          setSuccessMsg(`Welcome, ${newPatient.name}! Patient account registered.`);
          setTimeout(() => setAuthModalOpen(false), 900);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (target: 'doctor' | 'patient') => {
    if (target === 'doctor') {
      loginAs({
        id: 'doctor-lead',
        name: 'Dr. Malik Sayar (Doctor Admin)',
        email: 'doctor@realitymindclinic.com',
        phone: '+91 6005754205',
        role: 'admin',
        createdAt: '2026-01-01'
      });
      setSuccessMsg('Logged in as Doctor / Admin');
    } else {
      loginAs({
        id: 'patient-demo-1',
        name: 'Aamir Mir',
        email: 'aamir.mir@example.com',
        phone: '6005754205',
        role: 'patient',
        createdAt: '2026-09-20',
        unlockedVideoIds: ['cbt-basics', 'diaphragmatic-breathing', 'grounding-54321', 'thought-defusion-worry']
      });
      setSuccessMsg('Logged in as Patient Aamir Mir');
    }
    setTimeout(() => setAuthModalOpen(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-[#121212] text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Reality Mind Clinic
              </span>
              {isSupabaseConfigured ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                  <Database className="w-2.5 h-2.5" /> Supabase Live
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Local Active
                </span>
              )}
            </div>
            <h2 className="text-lg font-serif font-bold text-white mt-1">
              {currentUser
                ? 'Your Account Details'
                : authModalMode === 'signin'
                ? 'Sign In to Your Account'
                : 'Patient Registration'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setAuthModalOpen(false)}
            className="text-neutral-400 hover:text-white p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Currently logged-in profile display */}
          {currentUser ? (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-bold ${
                      isAdmin
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-200 text-neutral-800'
                    }`}
                  >
                    {isAdmin ? 'Doctor / Clinic Admin' : 'Registered Patient'}
                  </span>
                  <span className="text-[11px] text-neutral-400">ID: {currentUser.id.slice(0, 14)}</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-950">{currentUser.name}</h3>
                  <p className="text-xs text-neutral-600">{currentUser.email}</p>
                  {currentUser.phone && (
                    <p className="text-xs text-neutral-500 mt-0.5">Contact: {currentUser.phone}</p>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-200 text-[11px] text-neutral-500">
                  {isAdmin
                    ? '✓ Full clinical administrator privileges enabled (Appointments, Prescriptions, Videos & Articles).'
                    : '✓ Patient privileges enabled (Personal Portal, Prescriptions & Guided Interventions).'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setSuccessMsg('Logged out successfully.');
                  }}
                  className="py-2.5 px-4 border border-neutral-300 text-neutral-800 hover:border-black rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Sign Out
                </button>
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(false)}
                  className="py-2.5 px-4 bg-neutral-950 text-white hover:bg-neutral-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tab Selector: Login vs Register */}
              <div className="flex border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('signin');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border-b-2 ${
                    authModalMode === 'signin'
                      ? 'border-neutral-950 text-neutral-950'
                      : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login (Doctor / Patient)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('signup');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border-b-2 ${
                    authModalMode === 'signup'
                      ? 'border-neutral-950 text-neutral-950'
                      : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register Patient</span>
                </button>
              </div>

              {/* Status messages */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {authModalMode === 'signup' ? (
                  /* ========================================= */
                  /* PATIENT REGISTRATION FORM ONLY            */
                  /* ========================================= */
                  <>
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-600">
                      <strong>Patient Portal Registration:</strong> Create an account to access prescribed clinical videos, breathing tools, and manage your appointments.
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Farooq Ahmad"
                          className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 6005754205"
                          className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                {/* Common Email & Password Fields */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={authModalMode === 'signin' ? 'doctor@realitymindclinic.com or patient@example.com' : 'patient@example.com'}
                      className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-xs disabled:opacity-50"
                >
                  {loading
                    ? 'Processing...'
                    : authModalMode === 'signin'
                    ? 'Sign In to Portal'
                    : 'Complete Patient Registration'}
                </button>
              </form>

              {/* Quick Login Options */}
              {authModalMode === 'signin' && (
                <div className="pt-3 border-t border-neutral-200 space-y-2">
                  <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider text-center">
                    Instant 1-Click Access
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('doctor')}
                      className="p-2 border border-neutral-300 hover:border-black rounded-lg text-[11px] font-bold text-neutral-900 bg-neutral-50 flex items-center justify-center gap-1.5 transition-colors"
                      title="Log in directly as Dr. Malik Sayar (Admin)"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-neutral-900" />
                      <span>Doctor / Admin</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickLogin('patient')}
                      className="p-2 border border-neutral-300 hover:border-black rounded-lg text-[11px] font-medium text-neutral-700 bg-white flex items-center justify-center gap-1.5 transition-colors"
                      title="Log in directly as Patient Aamir Mir"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Patient (Aamir Mir)</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
