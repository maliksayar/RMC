import React from 'react';
import { X, Clock, Calendar, User, BookOpen, Share2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ArticleModal: React.FC = () => {
  const { activeArticle, setActiveArticle, setBookingModalOpen } = useApp();

  if (!activeArticle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-neutral-300 w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded border border-neutral-200">
              {activeArticle.category}
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              {activeArticle.readTime}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setActiveArticle(null)}
            className="text-neutral-400 hover:text-black transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Article Title & Metadata */}
          <div className="space-y-3 border-b border-neutral-200 pb-6">
            <h2 className="font-garamond text-2xl sm:text-4xl font-bold text-neutral-950 leading-tight">
              {activeArticle.title}
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-neutral-600">
              {activeArticle.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-2 font-mono">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {activeArticle.author}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticle.publishedDate}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-21/9 rounded-lg overflow-hidden border border-neutral-200">
            <img
              src={activeArticle.coverImage}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Executive Summary Box */}
          <div className="p-4 bg-neutral-50 border-l-2 border-neutral-900 rounded-r text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
            "{activeArticle.summary}"
          </div>

          {/* Body Sections */}
          <div className="space-y-6 text-neutral-800 text-sm sm:text-base leading-relaxed">
            {activeArticle.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-garamond text-xl font-bold text-neutral-950">
                  {sec.heading}
                </h3>
                <p className="text-neutral-700 font-sans text-xs sm:text-sm leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          {/* Key Clinical Takeaways */}
          <div className="border border-neutral-200 bg-neutral-50 p-5 rounded-lg space-y-3">
            <h4 className="font-garamond text-lg font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-black" />
              <span>Key Clinical Takeaways</span>
            </h4>
            <ul className="space-y-2 text-xs text-neutral-700">
              {activeArticle.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-400 font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Guidance Callout */}
          <div className="border border-neutral-900 p-5 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-950 text-white">
            <div>
              <h5 className="font-garamond text-lg font-bold">
                Experiencing these symptoms chronically?
              </h5>
              <p className="text-xs text-neutral-400 mt-0.5">
                Consult with our Psychologist at Tak Mohalla Road, Bijbehara or via online video call.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveArticle(null);
                setBookingModalOpen(true);
              }}
              className="bg-white text-black px-4 py-2 text-xs uppercase font-semibold tracking-wider rounded hover:bg-neutral-200 shrink-0"
            >
              Book Consultation
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500 shrink-0">
          <span>Reality Mind Clinic Clinical Guidance</span>
          <button
            type="button"
            onClick={() => setActiveArticle(null)}
            className="text-neutral-900 font-semibold hover:underline"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
