import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText, Phone, MapPin, ArrowRight } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
          <ShieldCheck className="w-4 h-4 text-neutral-900" />
          <span>Legal & Practice Standards</span>
        </div>
        <h1 className="font-garamond text-3xl sm:text-5xl font-bold text-neutral-950">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 font-mono">
          Last Updated: October 5, 2026
        </p>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans pt-2">
          Reality Mind Clinic respects your privacy and is committed to protecting the personal information you provide when using this website.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-10 text-neutral-800 font-sans text-xs sm:text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            1. Information We May Collect
          </h2>
          <p>
            When you use our website or request a consultation, we may collect information such as:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-700">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address, if provided</li>
            <li>Preferred consultation format</li>
            <li>Preferred date and time</li>
            <li>A brief description or note voluntarily provided through the booking form</li>
            <li>Information required to provide and manage website services</li>
          </ul>
          <p className="font-medium text-neutral-900 pt-1">
            We request only information that is reasonably necessary for the relevant purpose.
          </p>
        </section>

        {/* Section 2 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            2. How We Use Your Information
          </h2>
          <p>Information provided through this website may be used to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-700">
            <li>Respond to your enquiries</li>
            <li>Process and manage consultation requests</li>
            <li>Contact you regarding your appointment</li>
            <li>Provide requested services</li>
            <li>Maintain and improve the website</li>
            <li>Protect the security and proper functioning of the website</li>
            <li>Provide access to private therapeutic resources when such access is specifically provided by the clinic</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            3. Confidentiality
          </h2>
          <p>
            Information shared in the course of professional consultation is handled with appropriate confidentiality and care, subject to applicable laws, professional obligations, and circumstances in which disclosure may be legally required.
          </p>
          <div className="p-3.5 bg-neutral-50 border-l-2 border-neutral-900 rounded-r text-neutral-900 font-medium">
            Please avoid submitting highly sensitive clinical information through the general website booking form.
          </div>
        </section>

        {/* Section 4 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            4. Private Therapeutic Resources
          </h2>
          <p>
            Where the clinic provides personalized therapeutic resources through a private access system, access may be provided using a clinic-issued PIN or other authentication method.
          </p>
          <p className="font-medium text-neutral-900">
            These resources are intended only for the individual for whom they have been provided and should not be shared with others.
          </p>
        </section>

        {/* Section 5 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            5. Sharing of Information
          </h2>
          <p className="font-semibold text-neutral-950">
            Reality Mind Clinic does not sell personal information.
          </p>
          <p>
            Personal information may be shared with service providers or technology platforms where reasonably necessary to operate the website, manage communications, process bookings, maintain security, or provide requested services, subject to applicable requirements.
          </p>
          <p>
            Information may also be disclosed where required or permitted by applicable law.
          </p>
        </section>

        {/* Section 6 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            6. Data Security
          </h2>
          <p>
            Reasonable technical and organizational measures are used to protect personal information against unauthorized access, misuse, loss, alteration, or disclosure.
          </p>
          <p className="text-neutral-600">
            However, no method of electronic storage or transmission can be guaranteed to be completely secure.
          </p>
        </section>

        {/* Section 7 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            7. Your Choices and Rights
          </h2>
          <p>
            Depending on applicable law, you may have rights regarding your personal information, including rights to access, correction, withdrawal of consent where consent is the basis of processing, and other applicable rights.
          </p>
          <div className="pt-2 text-neutral-800 space-y-1">
            <p className="font-medium text-neutral-950">Requests relating to personal information may be directed to:</p>
            <p className="font-bold text-neutral-950">Reality Mind Clinic</p>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-600" />
              <span>Tark Mohalla Road, Bijbehara, Anantnag — 192124</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-neutral-600" />
              <span>Phone / WhatsApp: +91 6005754205</span>
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            8. Third-Party Services and Links
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

        {/* Section 9 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            9. Changes to This Policy
          </h2>
          <p>
            This Privacy Policy may be updated from time to time to reflect changes in the website, services, technology, or applicable requirements.
          </p>
          <p className="font-medium text-neutral-900">
            The updated version will be published on this page with a revised date.
          </p>
        </section>
      </div>

      {/* Footer Navigation Link */}
      <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <Link
          to="/terms"
          className="text-neutral-900 font-semibold hover:underline inline-flex items-center gap-1.5"
        >
          <span>View Terms of Use</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
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
