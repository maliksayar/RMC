import React from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Calendar,
  Shield,
  ExternalLink,
  QrCode,
  CheckCircle2,
  Mail
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

      {/* Official Physical Card Presentation matching Synopsis Page 1 & Page 5 */}
      <div className="max-w-4xl mx-auto">
        <div className="border-2 border-neutral-900 bg-white p-8 sm:p-12 rounded-xl shadow-lg relative overflow-hidden">
          {/* Hairline double frame */}
          <div className="border border-neutral-300 p-6 sm:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left: Brand & Address */}
            <div className="space-y-6 text-center md:text-left">
              <ClinicLogo size="lg" showWordmark={true} showTagline={true} />

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-neutral-700 font-sans">
                <div className="flex items-start gap-2.5 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span className="font-medium text-neutral-900">
                    Tak Mohalla Road, Bijbehara, Anantnag — 192124
                  </span>
                </div>

                <div className="flex items-center gap-2.5 justify-center md:justify-start">
                  <Phone className="w-4 h-4 text-black shrink-0" />
                  <a
                    href="tel:6005754205"
                    className="font-bold text-neutral-950 hover:underline tracking-wide"
                  >
                    6005754205
                  </a>
                </div>

                <div className="flex items-center gap-2.5 justify-center md:justify-start">
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

            {/* Right: WhatsApp QR Code Card as mentioned in synopsis page 5 */}
            <div className="border border-neutral-300 bg-neutral-50 p-6 rounded-lg text-center space-y-3 shrink-0 w-64 shadow-xs">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-neutral-500 block">
                WhatsApp QR Access
              </span>

              {/* High Fidelity SVG QR Code */}
              <div className="w-36 h-36 mx-auto bg-white p-2 border border-neutral-300 rounded shadow-xs flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  shapeRendering="crispEdges"
                >
                  {/* Outer QR Corner Anchors */}
                  <rect x="5" y="5" width="28" height="28" fill="#111111" />
                  <rect x="9" y="9" width="20" height="20" fill="#ffffff" />
                  <rect x="13" y="13" width="12" height="12" fill="#111111" />

                  <rect x="67" y="5" width="28" height="28" fill="#111111" />
                  <rect x="71" y="9" width="20" height="20" fill="#ffffff" />
                  <rect x="75" y="13" width="12" height="12" fill="#111111" />

                  <rect x="5" y="67" width="28" height="28" fill="#111111" />
                  <rect x="9" y="71" width="20" height="20" fill="#ffffff" />
                  <rect x="13" y="75" width="12" height="12" fill="#111111" />

                  {/* QR Data Matrix Bits */}
                  <rect x="38" y="8" width="8" height="6" fill="#111111" />
                  <rect x="52" y="8" width="6" height="10" fill="#111111" />
                  <rect x="42" y="20" width="18" height="6" fill="#111111" />
                  <rect x="8" y="38" width="10" height="6" fill="#111111" />
                  <rect x="24" y="38" width="8" height="8" fill="#111111" />
                  <rect x="38" y="38" width="24" height="24" fill="#111111" />
                  <rect x="44" y="44" width="12" height="12" fill="#ffffff" />
                  <rect x="48" y="48" width="4" height="4" fill="#111111" />
                  <rect x="68" y="38" width="10" height="6" fill="#111111" />
                  <rect x="82" y="42" width="10" height="10" fill="#111111" />
                  <rect x="38" y="68" width="8" height="10" fill="#111111" />
                  <rect x="52" y="74" width="12" height="6" fill="#111111" />
                  <rect x="72" y="68" width="10" height="10" fill="#111111" />
                  <rect x="84" y="74" width="8" height="18" fill="#111111" />
                  <rect x="40" y="86" width="16" height="6" fill="#111111" />
                  <rect x="62" y="86" width="14" height="6" fill="#111111" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-neutral-900 block">
                  Scan to WhatsApp
                </span>
                <p className="text-[10px] text-neutral-500">
                  Instant inquiry with the clinical desk: <strong>6005754205</strong>
                </p>
              </div>

              <a
                href="https://wa.me/916005754205"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-neutral-900 hover:underline flex items-center justify-center gap-1"
              >
                <span>Direct Chat Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Directions and Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

        <div className="border border-neutral-200 bg-white p-6 rounded-lg space-y-3">
          <Shield className="w-5 h-5 text-neutral-900" />
          <h4 className="font-garamond text-xl font-bold text-neutral-950">
            Strict Medical Privacy
          </h4>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Every consultation and digital video access code is strictly confidential. Patient records are never shared with third parties or external insurers.
          </p>
        </div>
      </div>
    </div>
  );
};
