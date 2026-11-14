import React from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock
} from 'lucide-react';
import { ClinicLogo } from '../components/ClinicLogo';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { setBookingModalOpen } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 font-bold">
          Section 12 · Reality Mind Clinic Details
        </span>
        <h1 className="font-garamond text-4xl sm:text-5xl font-bold text-neutral-950">
          Clinic Location & Consultations
        </h1>
        <p className="text-xs sm:text-base text-neutral-600 leading-relaxed font-sans">
          Visit us at our Bijbehara clinical facility or connect directly via WhatsApp and telephone.
        </p>
      </div>

      {/* Official Physical Card Presentation */}
      <div className="max-w-4xl mx-auto">
        <div className="border-2 border-neutral-900 bg-white p-8 sm:p-12 rounded-xl shadow-lg relative overflow-hidden">
          {/* Hairline double frame */}
          <div className="border border-neutral-300 p-6 sm:p-10 rounded-sm">
            <div className="space-y-6 text-center sm:text-left">
              <ClinicLogo size="lg" showWordmark={true} showTagline={true} />

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-neutral-700 font-sans">
                <div className="flex items-start gap-2.5 justify-center sm:justify-start">
                  <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span className="font-medium text-neutral-900">
                    Tak Mohalla Road, Bijbehara, Anantnag — 192124
                  </span>
                </div>

                <div className="flex items-center gap-2.5 justify-center sm:justify-start">
                  <Phone className="w-4 h-4 text-black shrink-0" />
                  <a
                    href="tel:6005754205"
                    className="font-bold text-neutral-950 hover:underline tracking-wide"
                  >
                    6005754205
                  </a>
                </div>

                <div className="flex items-center gap-2.5 justify-center sm:justify-start">
                  <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span>Mon – Sat: 10:00 AM – 6:00 PM</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="bg-black text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Book In-Clinic Slot
                </button>
                <a
                  href="https://wa.me/916005754205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-neutral-300 hover:border-black px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 text-neutral-800"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Directions and Guidance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="border border-neutral-200 bg-white p-6 rounded-lg space-y-3">
          <MapPin className="w-5 h-5 text-neutral-900" />
          <h4 className="font-garamond text-xl font-bold text-neutral-950">
            Bijbehara Center
          </h4>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Conveniently situated on Tak Mohalla Road in Bijbehara, Anantnag. Private, soundproof clinical rooms designed for tranquil psychotherapy and hypnotherapy.
          </p>
        </div>

        <div className="border border-neutral-200 bg-white p-6 rounded-lg space-y-3">
          <Phone className="w-5 h-5 text-neutral-900" />
          <h4 className="font-garamond text-xl font-bold text-neutral-950">
            Appointments & Inquiries
          </h4>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Reach out via phone or WhatsApp at <strong>6005754205</strong>. Our clinical coordinator can assist you with slot availability and pre-consultation questions.
          </p>
        </div>
      </div>
    </div>
  );
};
