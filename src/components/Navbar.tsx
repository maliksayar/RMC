import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  Bell,
  ShieldCheck,
  Phone,
  Menu,
  X,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClinicLogo } from './ClinicLogo';

export const Navbar: React.FC = () => {
  const {
    role,
    switchRole,
    currentUser,
    notifications,
    markNotificationAsRead,
    setBookingModalOpen
  } = useApp();

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

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

            <span className="text-neutral-700">|</span>

            {/* Portal Switcher Pill */}
            <div className="inline-flex items-center bg-neutral-900 border border-neutral-700 rounded-full p-0.5">
              <button
                type="button"
                onClick={() => switchRole('patient')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                  role === 'patient'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => switchRole('psychologist')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 transition-all ${
                  role === 'psychologist'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-2.5 h-2.5" />
                <span>Doctor</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Professional Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-neutral-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: ONLY THE LOGO ICON (NO NAME/TEXT in navbar as instructed) */}
            <Link
              to="/"
              className="shrink-0 flex items-center pr-4 xl:pr-6 focus:outline-hidden group"
              title="Reality Mind Clinic"
            >
              <ClinicLogo size="md" showWordmark={false} />
            </Link>

            {/* Center: Navigation Links with balanced uniform spacing */}
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

              {role === 'psychologist' && (
                <Link
                  to="/psychologist-dashboard"
                  className={`text-[12px] font-semibold px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    isActive('/psychologist-dashboard')
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'border-neutral-300 text-neutral-900 bg-neutral-50 hover:border-black'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Doctor Dashboard</span>
                </Link>
              )}

              {role === 'patient' && currentUser && (
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

            {/* Right: Action Buttons with uniform h-10 height */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Book Consultation Button */}
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="h-10 px-5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-xs whitespace-nowrap"
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
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="h-9 px-3.5 bg-neutral-950 text-white rounded text-xs font-semibold uppercase tracking-wider"
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
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Portal View
              </span>
              <div className="inline-flex items-center bg-neutral-100 border border-neutral-200 p-0.5 rounded-full text-xs">
                <button
                  type="button"
                  onClick={() => switchRole('patient')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    role === 'patient' ? 'bg-black text-white' : 'text-neutral-600'
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => switchRole('psychologist')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    role === 'psychologist' ? 'bg-black text-white' : 'text-neutral-600'
                  }`}
                >
                  Doctor
                </button>
              </div>
            </div>

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

              {role === 'psychologist' && (
                <Link
                  to="/psychologist-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 bg-neutral-100 px-3 rounded flex items-center gap-2 text-neutral-900"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Psychologist Panel</span>
                </Link>
              )}

              {role === 'patient' && currentUser && (
                <Link
                  to="/patient-portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-neutral-800"
                >
                  Patient Portal
                </Link>
              )}
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full bg-black text-white py-2.5 rounded font-semibold text-xs uppercase tracking-wider text-center"
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
