import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ArrowRight, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
          <Scale className="w-4 h-4 text-neutral-900" />
          <span>Legal & Practice Standards</span>
        </div>
        <h1 className="font-garamond text-3xl sm:text-5xl font-bold text-neutral-950">
          Terms of Use
        </h1>
        <p className="text-xs text-neutral-500 font-mono">
          Last Updated: October 5, 2026
        </p>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans pt-2">
          By using the Reality Mind Clinic website, you agree to use it responsibly and in accordance with these Terms of Use.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-10 text-neutral-800 font-sans text-xs sm:text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            1. Purpose of the Website
          </h2>
          <p>
            This website provides information about Reality Mind Clinic, its psychological services, educational resources, and consultation process.
          </p>
          <p className="text-neutral-700">
            Website content is intended to help visitors understand psychological difficulties and available professional support.
          </p>
        </section>

        {/* Section 2 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            2. Educational Information
          </h2>
          <p>
            Information provided on this website, including articles, videos, descriptions of psychological difficulties, and therapeutic approaches, is provided for general educational purposes.
          </p>
          <div className="p-3.5 bg-neutral-50 border-l-2 border-neutral-900 rounded-r text-neutral-900 font-medium">
            It should not be interpreted as a personal diagnosis or individualized treatment recommendation.
          </div>
        </section>

        {/* Section 3 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            3. Consultations and Treatment
          </h2>
          <p>
            Submitting a consultation request does not itself establish a therapeutic relationship or guarantee an appointment.
          </p>
          <p>
            The appropriate form of psychological support or therapeutic approach is determined after appropriate professional discussion and assessment.
          </p>
          <p className="font-medium text-neutral-900">
            No specific treatment outcome can be guaranteed.
          </p>
        </section>

        {/* Section 4 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            4. Website Use
          </h2>
          <p className="font-medium text-neutral-950">You agree not to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-700">
            <li>Misuse the website or attempt to interfere with its operation</li>
            <li>Attempt unauthorized access to restricted areas or private resources</li>
            <li>Share private access credentials or PINs provided specifically to you</li>
            <li>Copy, reproduce, distribute, or commercially use website content without appropriate permission</li>
            <li>Use the website for unlawful purposes</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            5. Intellectual Property
          </h2>
          <p>
            The original text, graphics, videos, branding, educational materials, and other content created for Reality Mind Clinic are protected by applicable intellectual-property laws.
          </p>
          <p className="font-medium text-neutral-900">
            Permission should be obtained before reproducing or commercially using such content.
          </p>
        </section>

        {/* Section 6 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            6. External Links
          </h2>
          <p>
            The website may contain links to third-party websites or services.
          </p>
          <p className="text-neutral-700">
            These links are provided for convenience or informational purposes. Reality Mind Clinic does not control and is not responsible for the content, availability, or privacy practices of external websites.
          </p>
        </section>

        {/* Section 7 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            7. Changes to the Website
          </h2>
          <p>
            Reality Mind Clinic may update, modify, suspend, or discontinue parts of the website or its content when necessary.
          </p>
        </section>

        {/* Section 8 */}
        <section className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl space-y-4">
          <h2 className="font-garamond text-xl sm:text-2xl font-bold text-neutral-950 border-b border-neutral-100 pb-2">
            8. Changes to These Terms
          </h2>
          <p>
            These Terms of Use may be updated from time to time. Changes will be published on this page with an updated date.
          </p>
        </section>
      </div>

      {/* Footer Navigation Link */}
      <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <Link
          to="/privacy"
          className="text-neutral-900 font-semibold hover:underline inline-flex items-center gap-1.5"
        >
          <span>View Privacy Policy</span>
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
