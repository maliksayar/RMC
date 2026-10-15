import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Bell,
  ShieldCheck,
  Phone,
  Menu,
  X,
  MapPin,
  MessageCircle,
  User as UserIcon,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClinicLogo } from './ClinicLogo';

export const Navbar: React.FC = () => {
  const {
    role,
    isAdmin,
    switchRole,
    currentUser,
    notifications,
    markNotificationAsRead,
    setBookingModalOpen,
    openAuthModal,
    logout,
    isSupabaseLive
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isActive = (path: string) => location.pathname === path;

  // Uniform clinical navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* 1. Top Clinical Announcement Strip */}
      <div className="bg-[#121212] text-neutral-300 text-xs border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          {/* Location & Practice Note */}
          <div className="flex items-center gap-2 text-neutral-300 text-[11px] font-medium">
            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
            <span>Tak Mohalla Road, Bijbehara, Anantnag — 192124</span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-400">
              Psychological Consultation & Patient Guidance
            </span>
          </div>

          {/* Quick Helplines & Role Portal Switcher */}
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="tel:6005754205"
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-neutral-400" />
              <span>+91 6005754205</span>
            </a>

            <span className="text-neutral-700 hidden sm:inline">|</span>

            <a
              href="https://wa.me/916005754205"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Booking</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-neutral-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: ONLY THE LOGO ICON */}
            <Link
              to="/"
              className="shrink-0 flex items-center pr-4 xl:pr-6 focus:outline-hidden group"
              title="Reality Mind Clinic"
            >
              <ClinicLogo size="md" showWordmark={false} />
            </Link>

            {/* Center: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-8">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-[13px] font-medium tracking-normal transition-colors py-2 relative whitespace-nowrap ${
                      active
                        ? 'text-neutral-950 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-neutral-950'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Role-Based Portal Links */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`text-[12px] font-bold px-3 py-1.5 rounded-md border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive('/admin') || isActive('/psychologist-dashboard')
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                      : 'border-neutral-800 text-neutral-900 bg-neutral-100 hover:bg-neutral-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </Link>
              )}

              {/* Patient Portal Link (Only for Patients) */}
              {currentUser && !isAdmin && (
                <Link
                  to="/patient-portal"
                  className={`text-[13px] font-medium transition-colors py-2 relative whitespace-nowrap ${
                    isActive('/patient-portal')
                      ? 'text-neutral-950 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-neutral-950'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  Patient Portal
                </Link>
              )}
            </nav>

            {/* Right: Action Buttons & Authentication Buttons */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              {/* Book Consultation Button */}
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="h-10 px-4 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-800 transition-all flex items-center gap-1.5 shadow-xs whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Book Consultation</span>
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="h-10 w-10 border border-neutral-200 rounded-md flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors relative"
                  aria-label="Clinical notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-neutral-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Popup */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-neutral-200 shadow-xl rounded-md p-3 z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                        Clinic Notifications
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        {notifications.length} updates
                      </span>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-neutral-400 py-3 text-center">
                          No notifications at present.
                        </p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationAsRead(n.id)}
                            className={`p-2 rounded text-xs transition-colors cursor-pointer ${
                              n.read
                                ? 'bg-neutral-50 text-neutral-600'
                                : 'bg-neutral-100/70 border-l-2 border-black text-neutral-900 font-medium'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-0.5">
                              <span>{n.title}</span>
                              <span>{n.date}</span>
                            </div>
                            <p className="text-xs leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ======================================================== */}
              {/* AUTHENTICATION: LOGIN & REGISTER (OR LOGGED-IN PROFILE) */}
              {/* ======================================================== */}
              {currentUser ? (
                /* Logged-In User Profile Pill with Quick Dropdown */
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="h-10 px-3 border border-neutral-300 rounded-md flex items-center gap-2 hover:border-black transition-all bg-neutral-50"
                  >
                    <div className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[11px] flex items-center justify-center font-bold">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div className="text-left text-xs leading-tight">
                      <span className="font-bold text-neutral-900 block max-w-[95px] truncate">
                        {currentUser.name.split(' ')[0]}
                      </span>
                      <span
                        className={`text-[9px] uppercase font-mono font-bold block ${
                          isAdmin ? 'text-black' : 'text-neutral-500'
                        }`}
                      >
                        {isAdmin ? 'Doctor' : 'Patient'}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 space-y-1">
                      <div className="p-2 border-b border-neutral-100">
                        <div className="text-xs font-bold text-neutral-950 truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] text-neutral-500 truncate">
                          {currentUser.email}
                        </div>
                        <span className="inline-block mt-1 text-[9px] font-mono uppercase bg-neutral-100 px-2 py-0.5 rounded font-bold text-neutral-800">
                          Role: {currentUser.role}
                        </span>
                      </div>

                      {isAdmin ? (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Admin Control Panel</span>
                        </Link>
                      ) : (
                        <Link
                          to="/patient-portal"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <UserIcon className="w-4 h-4" />
                          <span>Patient Portal</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          openAuthModal('signin');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Manage Account</span>
                      </button>

                      <div className="pt-1 border-t border-neutral-100">
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Distinct Login & Register Buttons */
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openAuthModal('signin')}
                    className="h-10 px-3.5 border border-neutral-300 rounded-md text-xs font-semibold text-neutral-800 hover:border-black flex items-center gap-1.5 transition-colors bg-white hover:bg-neutral-50 shadow-2xs"
                  >
                    <LogIn className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openAuthModal('signup')}
                    className="h-10 px-3.5 bg-neutral-950 text-white rounded-md text-xs font-semibold hover:bg-neutral-800 flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="h-9 px-2.5 border border-neutral-300 rounded text-neutral-800 text-xs font-semibold flex items-center gap-1"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono">{currentUser.name.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="h-9 px-2.5 border border-neutral-300 rounded text-neutral-800 text-xs font-semibold flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="h-9 px-3 bg-neutral-950 text-white rounded text-xs font-semibold uppercase tracking-wider"
              >
                Book
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-9 w-9 border border-neutral-200 rounded flex items-center justify-center text-neutral-900 hover:bg-neutral-100"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-5 pt-3 pb-6 space-y-4">
            {/* Links */}
            <nav className="flex flex-col space-y-2 text-sm font-semibold text-neutral-800">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-neutral-100"
                >
                  <span>{link.name}</span>
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 bg-neutral-100 px-3 rounded flex items-center gap-2 text-neutral-900 font-bold"
                >
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Doctor Admin Panel</span>
                </Link>
              )}

              {currentUser && !isAdmin && (
                <Link
                  to="/patient-portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-neutral-800"
                >
                  Patient Portal
                </Link>
              )}
            </nav>

            {/* Auth in Mobile Menu */}
            <div className="pt-2 flex flex-col gap-2 border-t border-neutral-100">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
                    <div className="font-bold text-neutral-900">{currentUser.name}</div>
                    <div className="text-[11px] text-neutral-500">
                      Logged in as <strong>{currentUser.role.toUpperCase()}</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full py-2 border border-red-300 text-red-700 rounded text-xs font-semibold uppercase tracking-wider text-center"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signin');
                    }}
                    className="w-full border border-neutral-300 py-2.5 rounded font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 text-neutral-900"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signup');
                    }}
                    className="w-full bg-neutral-950 text-white py-2.5 rounded font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full bg-black text-white py-2.5 rounded font-semibold text-xs uppercase tracking-wider text-center mt-1"
              >
                Book Consultation Slot
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
