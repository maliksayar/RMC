import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Shield,
  ArrowUpRight,
  Heart
} from 'lucide-react';
import { ClinicLogo } from './ClinicLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-neutral-800">
          {/* Column 1: Brand & Philosophy */}
          <div className="md:col-span-4 space-y-5">
            <div className="text-white">
              <ClinicLogo size="md" showWordmark={true} showTagline={true} />
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Reality Mind Clinic is an evidence-based clinical psychology and hypnotherapy practice.
              We provide structured psychological consultations paired with tailored, private digital
              interventions for enduring patient recovery.
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-neutral-400 border border-neutral-800 px-3 py-1.5 rounded bg-neutral-900/60">
              <Shield className="w-3.5 h-3.5 text-neutral-200" />
              <span>Strict Confidentiality & Medical Privacy</span>
            </div>
          </div>

          {/* Column 2: Clinical Services */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-white">
              Clinical Services
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Psychotherapy</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Clinical Hypnotherapy</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Mental Health & Wellbeing</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </Link>
              </li>
              <li>
                <Link to="/interventions" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Private Intervention Videos</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Psychoeducational Articles</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Treatment Areas */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-white">
              Specialized Areas
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>Anxiety Disorders</li>
              <li>Clinical Depression</li>
              <li>OCD (ERP Protocol)</li>
              <li>Chronic Overthinking</li>
              <li>Fear & Phobias</li>
              <li>Sleep Problems & CBT-I</li>
            </ul>
          </div>

          {/* Column 4: Contact & Bijbehara Location */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-white">
              Clinic Location
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Tak Mohalla Road, Bijbehara, Anantnag — 192124
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href="tel:6005754205" className="hover:text-white transition-colors font-semibold">
                  +91 6005754205
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/916005754205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Direct Booking
                </a>
              </div>

              <div className="flex items-start gap-2.5 text-neutral-400 pt-1">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <p>Mon – Sat: 10:00 AM – 6:00 PM</p>
                  <p className="text-[11px] text-neutral-500">Sunday by prior appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Reality Mind Clinic. All rights reserved.</span>
          </div>

          <div className="text-[11px] text-neutral-500 text-center sm:text-right">
            <span>Beyond Symptoms. Real Recovery. · Tak Mohalla Road, Bijbehara</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
