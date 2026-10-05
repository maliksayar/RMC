import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  MessageSquare
} from 'lucide-react';
import { ClinicLogo } from './ClinicLogo';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setBookingModalOpen } = useApp();

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/80">
          {/* Column 1: Brand Logo & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-white">
              <ClinicLogo size="md" showWordmark={true} showTagline={true} />
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              Evidence-informed psychological care tailored to your needs, with personalized therapeutic interventions and guidance beyond the consultation room.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="hover:text-white transition-colors text-left font-medium text-neutral-300 hover:underline cursor-pointer"
                >
                  Book a Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Psychotherapy
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Clinical Hypnotherapy
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  CBT
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Online Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white">
              Contact
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Tark Mohalla Road, Bijbehara, Anantnag — 192124
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a
                  href="tel:6005754205"
                  className="hover:text-white transition-colors font-medium"
                >
                  Phone / WhatsApp: +91 6005754205
                </a>
              </div>

              <div className="pt-1">
                <a
                  href="https://wa.me/916005754205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
          <div>
            <span>© 2026 Reality Mind Clinic. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-600">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span className="text-neutral-600">|</span>
            <Link to="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
