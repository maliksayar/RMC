import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LogIn,
  UserPlus,
  ArrowRight,
  Stethoscope,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/initialData';

export const AuthModal: React.FC = () => {
  const navigate = useNavigate();
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
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');

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
        const cleanEmail = email.trim().toLowerCase();
        const isDoctorAdmin =
          cleanEmail === 'realitymindclinic@gmail.com' || cleanEmail === 'doctor@realitymindclinic.com';

        // Direct verified credentials check for sole Doctor / Admin
        if (isDoctorAdmin && password === 'Reality@123') {
          loginAs({
            id: '32d5ebbd-476a-4199-b9fe-4c2410ffa230',
            name: 'Yehya Hassan',
            email: 'realitymindclinic@gmail.com',
            phone: '+91 6005754205',
            role: 'admin',
            createdAt: '2026-01-01'
          });
          setSuccessMsg('Signed in as Yehya Hassan (Doctor Admin)! Opening Admin Dashboard...');
          setTimeout(() => {
            setAuthModalOpen(false);
            navigate('/admin', { replace: true });
          }, 450);
          return;
        }

        // Sign In via Supabase
        if (isSupabaseConfigured) {
          const result = await loginWithSupabase(cleanEmail, password);
          if (!result.success) {
            // If Supabase has unconfirmed email flag for doctor, permit login with verified clinic password
            if (isDoctorAdmin && password === 'Reality@123') {
              loginAs({
                id: '32d5ebbd-476a-4199-b9fe-4c2410ffa230',
                name: 'Yehya Hassan',
                email: 'realitymindclinic@gmail.com',
                phone: '+91 6005754205',
                role: 'admin',
                createdAt: '2026-01-01'
              });
              setSuccessMsg('Signed in as Yehya Hassan (Doctor Admin)! Opening Admin Dashboard...');
              setTimeout(() => {
                setAuthModalOpen(false);
                navigate('/admin', { replace: true });
              }, 450);
              return;
            }
            setErrorMsg(result.message || 'Failed to sign in. Please verify your credentials.');
          } else {
            const role = result.role;
            const isDoctor = role === 'admin' || role === 'psychologist';
            setSuccessMsg(
              `Signed in successfully! Redirecting to ${isDoctor ? 'Admin Dashboard' : 'Patient Portal'}...`
            );
            setTimeout(() => {
              setAuthModalOpen(false);
              navigate(isDoctor ? '/admin' : '/patient-portal', { replace: true });
            }, 450);
          }
        } else {
          // Local offline fallback login
          if (isDoctorAdmin) {
            loginAs(DEMO_USERS[0]);
            setSuccessMsg('Signed in as Yehya Hassan (Doctor Admin)! Opening Admin Dashboard...');
            setTimeout(() => {
              setAuthModalOpen(false);
              navigate('/admin', { replace: true });
            }, 450);
          } else {
            loginAs({
              id: `pat-${Date.now()}`,
              name: name || email.split('@')[0],
              email: cleanEmail,
              phone: phone || '+91 6005754205',
              role: 'patient',
              createdAt: new Date().toISOString()
            });
            setSuccessMsg('Signed in as Patient! Opening Patient Portal...');
            setTimeout(() => {
              setAuthModalOpen(false);
              navigate('/patient-portal', { replace: true });
            }, 450);
          }
        }
      } else {
        // Registration
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
            role: selectedRole
          });

          if (!result.success) {
            setErrorMsg(result.message || 'Failed to register account.');
          } else {
            if (result.autoLoggedIn) {
              const isDoctor = result.role === 'admin' || result.role === 'psychologist';
              setSuccessMsg(`Welcome, ${name}! Redirecting to ${isDoctor ? 'Admin Dashboard' : 'Patient Portal'}...`);
              setTimeout(() => {
                setAuthModalOpen(false);
                navigate(isDoctor ? '/admin' : '/patient-portal', { replace: true });
              }, 500);
            } else {
              setSuccessMsg(
                result.message || 'Account registered! Please sign in with your credentials.'
              );
              setTimeout(() => {
                setAuthModalMode('signin');
              }, 1200);
            }
          }
        } else {
          // Local offline fallback registration
          const newUser: User = {
            id: `pat-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || '+91 6005754205',
            role: 'patient',
            createdAt: new Date().toISOString()
          };
          loginAs(newUser);
          setSuccessMsg(`Welcome, ${newUser.name}! Redirecting to Patient Portal...`);
          setTimeout(() => {
            setAuthModalOpen(false);
            navigate('/patient-portal', { replace: true });
          }, 500);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (target: 'doctor') => {
    if (target === 'doctor') {
      loginAs(DEMO_USERS[0]);
      setSuccessMsg('Logged in as Yehya Hassan (Doctor Admin)! Opening Admin Dashboard...');
      setTimeout(() => {
        setAuthModalOpen(false);
        navigate('/admin', { replace: true });
      }, 400);
    }
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
                ? 'Your Account Session'
                : authModalMode === 'signin'
                ? 'Sign In to Clinical Portal'
                : 'Create New Account'}
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
                    ? '✓ Full clinical administrator privileges enabled (Appointments, PINs, Videos & Articles).'
                    : '✓ Patient privileges enabled (Personal Portal, Prescriptions & Guided Interventions).'}
                </div>
              </div>

              {/* Direct Link to their specific Dashboard */}
              <button
                type="button"
                onClick={() => {
                  setAuthModalOpen(false);
                  navigate(isAdmin ? '/admin' : '/patient-portal');
                }}
                className="w-full py-3 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>Go to {isAdmin ? 'Doctor / Admin Dashboard' : 'Patient Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
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
                  className="py-2.5 px-4 bg-neutral-100 text-neutral-800 hover:bg-neutral-200 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
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
                  <span>Log In</span>
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
                  <span>Register Account</span>
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
                {authModalMode === 'signup' && (
                  <>
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 text-xs flex items-center gap-2.5">
                      <HeartHandshake className="w-5 h-5 text-neutral-900 shrink-0" />
                      <div>
                        <strong className="block text-neutral-950 font-bold">Patient Account Registration</strong>
                        <span className="text-[11px] text-neutral-500">Create your private patient account to access consultations, prescriptions, and interventions.</span>
                      </div>
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
                          placeholder="Enter your full name"
                          className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 6005754205"
                          className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email Address */}
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
                      placeholder={
                        authModalMode === 'signin'
                          ? 'realitymindclinic@gmail.com or patient@example.com'
                          : selectedRole === 'admin'
                          ? 'realitymindclinic@gmail.com'
                          : 'patient@example.com'
                      }
                      className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                    />
                  </div>
                </div>

                {/* Password */}
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
                      placeholder="At least 6 characters (e.g. Reality@123)"
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
                    ? 'Sign In & Redirect'
                    : 'Create Patient Account'}
                </button>
              </form>

              {/* Instant 1-Click Access for Doctor */}
              {authModalMode === 'signin' && (
                <div className="pt-3 border-t border-neutral-200 space-y-2">
                  <span className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider text-center">
                    Doctor Admin Quick Access
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('doctor')}
                    className="w-full p-2.5 border border-neutral-300 hover:border-black rounded-lg text-[11px] font-bold text-neutral-900 bg-neutral-50 flex items-center justify-center gap-1.5 transition-colors group"
                    title="Log in directly as Yehya Hassan and open /admin"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-900 group-hover:scale-110 transition-transform" />
                    <span>Doctor Admin (Yehya Hassan)</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
