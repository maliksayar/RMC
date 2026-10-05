import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, AlertCircle, PhoneCall, ArrowRight, ShieldAlert, HeartHandshake } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Clinical & Legal Notice</span>
        </div>
        <h1 className="font-garamond text-3xl sm:text-5xl font-bold text-neutral-950">
          Clinical Disclaimer
        </h1>
        <p className="text-xs text-neutral-500 font-mono">
          Last Updated: October 5, 2026
        </p>
      </div>

      {/* Emergency Notice Card */}
      <div className="border border-red-200 bg-red-50/60 p-6 sm:p-7 rounded-xl space-y-3">
        <div className="flex items-center gap-2.5 text-red-900 font-bold text-sm sm:text-base">
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
          <span>Mental Health Emergency Notice</span>
        </div>
        <p className="text-xs sm:text-sm text-red-950 leading-relaxed font-sans">
          This website and its contact/booking system are not intended for emergency mental-health situations. If you or someone else is in immediate danger, at risk of serious harm, or requires urgent medical attention, seek immediate help through appropriate emergency services or go to the nearest emergency department.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-neutral-800 font-sans text-xs sm:text-sm leading-relaxed">
        {/* 1. General Information */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-3.5">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            General Information
          </h2>
          <p>
            The information provided on the Reality Mind Clinic website is intended for general educational and informational purposes.
          </p>
          <p className="font-medium text-neutral-900">
            It is not a substitute for an individual psychological assessment, diagnosis, medical evaluation, or professional treatment.
          </p>
        </section>

        {/* 2. No Online Diagnosis */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-3.5">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            No Online Diagnosis
          </h2>
          <p>
            Descriptions of symptoms, psychological difficulties, or therapeutic approaches on this website are provided to help visitors understand these topics.
          </p>
          <div className="p-3.5 bg-neutral-50 border-l-2 border-neutral-900 rounded-r text-neutral-900 font-medium">
            They should not be used to self-diagnose or diagnose another person. Similar experiences may occur for different psychological, medical, or situational reasons.
          </div>
        </section>

        {/* 3. Consultation Requests */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-3.5">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            Consultation Requests
          </h2>
          <p>
            Submitting a booking or contact form does not constitute an emergency service and does not guarantee immediate professional assistance.
          </p>
          <p className="font-medium text-neutral-900">
            A consultation request must be confirmed by the clinic.
          </p>
        </section>

        {/* 4. Emergencies */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-3.5">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            Emergencies
          </h2>
          <p>
            This website and its contact/booking system are not intended for emergency mental-health situations.
          </p>
          <p>
            If you or someone else is in immediate danger, at risk of serious harm, or requires urgent medical attention, seek immediate help through appropriate emergency services or go to the nearest emergency department.
          </p>
        </section>

        {/* 5. Treatment Outcomes */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-3.5">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            Treatment Outcomes
          </h2>
          <p>
            Psychological treatment is individualized, and outcomes vary between people.
          </p>
          <p className="font-medium text-neutral-900">
            Information on this website should not be interpreted as a guarantee of a particular therapeutic result.
          </p>
        </section>

        {/* 6. Clinical Information */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-3.5">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            Clinical Information
          </h2>
          <p>
            Information about psychotherapy, clinical hypnotherapy, CBT, psychological difficulties, and other therapeutic approaches is intended to provide general understanding and should not be interpreted as a recommendation that a particular approach is suitable for every individual.
          </p>
          <p className="font-medium text-neutral-900">
            The appropriate approach depends on the person's circumstances and professional assessment.
          </p>
        </section>

        {/* 7. Third-Party Services */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-3.5">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            Third-Party Services
          </h2>
          <p className="font-semibold text-neutral-950">
            Reality Mind Clinic does not use advertisements or unrelated third-party services on this website.
          </p>
          <p>
            The website may provide a WhatsApp contact option so that visitors can contact the clinic directly. When you choose to use this option, you will be redirected to WhatsApp and your interaction will then be subject to WhatsApp's own terms and privacy practices.
          </p>
          <p>
            Reality Mind Clinic does not control WhatsApp's policies or the information practices of WhatsApp. Visitors should review WhatsApp's applicable privacy information before using the service.
          </p>
          <p>
            Apart from services necessary to operate, secure, and maintain the website, Reality Mind Clinic does not intentionally provide unrelated third-party links or advertising services on the website.
          </p>
        </section>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <Link
            to="/privacy"
            className="text-neutral-900 font-semibold hover:underline inline-flex items-center gap-1"
          >
            Privacy Policy
          </Link>
          <span className="text-neutral-400">·</span>
          <Link
            to="/terms"
            className="text-neutral-900 font-semibold hover:underline inline-flex items-center gap-1"
          >
            Terms of Use
          </Link>
        </div>
        <Link
          to="/"
          className="text-neutral-600 hover:text-neutral-950"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};
