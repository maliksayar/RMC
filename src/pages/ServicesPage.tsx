import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Sparkles,
  Layers,
  Compass,
  Video,
  KeyRound,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServicesPage: React.FC = () => {
  const { setBookingModalOpen, setPinModalOpen } = useApp();

  // State to track expanded 'Learn More' modals/accordions
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleLearnMore = (sectionKey: string) => {
    setExpandedSection(prev => (prev === sectionKey ? null : sectionKey));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
      {/* 1. Header Section */}
      <section className="border border-neutral-300 bg-white p-8 sm:p-12 rounded-xl shadow-xs text-center max-w-4xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
          Services
        </span>
        <h1 className="font-garamond text-3xl sm:text-5xl font-bold text-neutral-950">
          Psychological Services
        </h1>
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans max-w-2xl mx-auto pt-2">
          <p className="font-medium text-neutral-900 text-sm sm:text-base">
            At Reality Mind Clinic, psychological treatment is tailored to your individual concerns, needs, and therapeutic goals.
          </p>
          <p>
            You do not need to decide which therapy you need before your consultation. Your concerns are explored professionally, and the appropriate therapeutic approach is discussed based on your needs.
          </p>
        </div>

        <div className="pt-3 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setBookingModalOpen(true)}
            className="bg-black text-white px-7 py-3 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Consultation</span>
          </button>
          <a
            href="https://wa.me/916005754205"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-neutral-300 hover:border-black text-neutral-900 px-6 py-3 rounded text-xs font-semibold uppercase tracking-widest transition-colors flex items-center gap-1.5"
          >
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </section>

      {/* 2. Core Therapeutic Modalities (Psychotherapy, Clinical Hypnotherapy, CBT, REBT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Modality 1: Psychotherapy */}
        <div className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl shadow-xs flex flex-col justify-between space-y-5 hover:border-neutral-400 transition-colors">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Clinical Modality
              </span>
              <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950 mt-0.5">
                Psychotherapy
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              <p className="font-medium text-neutral-900">
                Psychotherapy is more than simply talking about problems.
              </p>
              <p>
                It is a structured form of psychological treatment that helps you understand and work with patterns in your thoughts, emotions, behaviours, beliefs, and responses that may be contributing to your difficulties.
              </p>
              <p>
                Through therapy, you can learn to understand these patterns, develop healthier ways of responding, and make meaningful changes in everyday life.
              </p>
            </div>

            {/* Learn More Accordion Details */}
            {expandedSection === 'psychotherapy' && (
              <div className="mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-600 space-y-2 bg-neutral-50 p-4 rounded-lg">
                <span className="font-bold text-neutral-900 block">Clinical Context:</span>
                <p>
                  Psychotherapy provides a safe, structured, and confidential space to unpack underlying learned reactions, emotional blocks, and repeating maladaptive coping patterns. Sessions focus on self-awareness, active skill acquisition, and long-term psychological resilience.
                </p>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => toggleLearnMore('psychotherapy')}
              className="text-xs font-semibold text-neutral-900 hover:text-black flex items-center gap-1.5 py-1 transition-colors cursor-pointer group"
            >
              <span>{expandedSection === 'psychotherapy' ? 'Show Less' : 'Learn More'}</span>
              {expandedSection === 'psychotherapy' ? (
                <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Modality 2: Clinical Hypnotherapy */}
        <div className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl shadow-xs flex flex-col justify-between space-y-5 hover:border-neutral-400 transition-colors">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Specialized Focus
              </span>
              <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950 mt-0.5">
                Clinical Hypnotherapy
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              <p className="font-medium text-neutral-900">
                Clinical hypnotherapy is the therapeutic use of clinical hypnosis within psychological treatment.
              </p>
              <p>
                It involves focused attention and therapeutic suggestions to work with learned responses, automatic patterns, emotional reactions, and other psychological processes.
              </p>
              <p>
                It may be used alongside psychotherapy or as part of an individualized therapeutic plan when clinically appropriate.
              </p>
            </div>

            {/* Learn More Accordion Details */}
            {expandedSection === 'hypnotherapy' && (
              <div className="mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-600 space-y-2 bg-neutral-50 p-4 rounded-lg">
                <span className="font-bold text-neutral-900 block">Clinical Context:</span>
                <p>
                  Conducted by a qualified hypnotherapist trained under one-to-one supervision. It works directly with automatic autonomic responses, deep stress conditioning, psychosomatic symptoms, and phobic triggers in a relaxed state of heightened mental absorption.
                </p>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => toggleLearnMore('hypnotherapy')}
              className="text-xs font-semibold text-neutral-900 hover:text-black flex items-center gap-1.5 py-1 transition-colors cursor-pointer group"
            >
              <span>{expandedSection === 'hypnotherapy' ? 'Show Less' : 'Learn More'}</span>
              {expandedSection === 'hypnotherapy' ? (
                <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Modality 3: Cognitive Behavioural Therapy (CBT) */}
        <div className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl shadow-xs flex flex-col justify-between space-y-5 hover:border-neutral-400 transition-colors">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Evidence-Based Protocol
              </span>
              <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950 mt-0.5">
                Cognitive Behavioural Therapy (CBT)
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              <p className="font-medium text-neutral-900">
                CBT looks at the connection between your thoughts, feelings, and behaviours.
              </p>
              <p>
                Sometimes, patterns of thinking and behaviour can keep anxiety, fear, low mood, or other difficulties going.
              </p>
              <p>
                CBT helps you identify these patterns, examine whether they are helpful or unhelpful, and develop more effective ways of thinking and responding.
              </p>
            </div>

            {/* Learn More Accordion Details */}
            {expandedSection === 'cbt' && (
              <div className="mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-600 space-y-2 bg-neutral-50 p-4 rounded-lg">
                <span className="font-bold text-neutral-900 block">Clinical Context:</span>
                <p>
                  CBT provides concrete tools including cognitive restructuring, behavioural experiments, thought logs, and exposure ladders. Clients learn to recognize thinking errors like catastrophizing and all-or-nothing thinking to break cycles of distress.
                </p>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => toggleLearnMore('cbt')}
              className="text-xs font-semibold text-neutral-900 hover:text-black flex items-center gap-1.5 py-1 transition-colors cursor-pointer group"
            >
              <span>{expandedSection === 'cbt' ? 'Show Less' : 'Learn More'}</span>
              {expandedSection === 'cbt' ? (
                <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Modality 4: Rational Emotive Behaviour Therapy (REBT) */}
        <div className="border border-neutral-200 bg-white p-6 sm:p-8 rounded-xl shadow-xs flex flex-col justify-between space-y-5 hover:border-neutral-400 transition-colors">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Philosophical & Cognitive Method
              </span>
              <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950 mt-0.5">
                Rational Emotive Behaviour Therapy (REBT)
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              <p className="font-medium text-neutral-900">
                REBT focuses on how our beliefs and interpretations can influence our emotional reactions and behaviour.
              </p>
              <p>
                It helps you identify rigid or unhelpful beliefs, examine them realistically, and develop more flexible and balanced ways of responding to difficult situations.
              </p>
            </div>

            {/* Learn More Accordion Details */}
            {expandedSection === 'rebt' && (
              <div className="mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-600 space-y-2 bg-neutral-50 p-4 rounded-lg">
                <span className="font-bold text-neutral-900 block">Clinical Context:</span>
                <p>
                  Pioneered by Albert Ellis, REBT disputes irrational demands ("musts", "shoulds", and "awfulizing"). By adopting unconditional self-acceptance and unconditional life-acceptance, clients foster genuine emotional fortitude.
                </p>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => toggleLearnMore('rebt')}
              className="text-xs font-semibold text-neutral-900 hover:text-black flex items-center gap-1.5 py-1 transition-colors cursor-pointer group"
            >
              <span>{expandedSection === 'rebt' ? 'Show Less' : 'Learn More'}</span>
              {expandedSection === 'rebt' ? (
                <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Online Psychological Consultation */}
      <section className="border border-neutral-300 bg-white p-8 sm:p-10 rounded-xl shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <Video className="w-4 h-4 text-neutral-900" />
              <span>Telehealth & Remote Care</span>
            </div>
            <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
              Online Psychological Consultation
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              <p className="font-medium text-neutral-900">
                Professional psychological support is also available online.
              </p>
              <p>
                Online consultations can provide a convenient way to discuss your concerns and work therapeutically when attending the clinic in person is not practical or preferred.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="w-full bg-black text-white px-6 py-3.5 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </button>
            <a
              href="https://wa.me/916005754205"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-neutral-300 hover:border-black text-neutral-900 px-6 py-3.5 rounded text-xs font-semibold uppercase tracking-widest text-center transition-colors"
            >
              Consult via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 4. Personalized Therapeutic Interventions & PIN Access */}
      <section className="border border-neutral-900 bg-neutral-950 text-white p-8 sm:p-12 rounded-xl space-y-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
            <KeyRound className="w-4 h-4 text-white" />
            <span>Beyond the Consultation Room</span>
          </div>
          <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-white">
            Personalized Therapeutic Interventions
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            <p className="font-medium text-white text-sm sm:text-base">
              Therapeutic work does not always end when the consultation ends.
            </p>
            <p>
              When appropriate, specific therapeutic exercises or interventions may be personally demonstrated and practised under the guidance of the therapist.
            </p>
            <p>
              You may then receive selected exercises, instructions, psychoeducation, or therapeutic resources to practise between consultations.
            </p>
            <div className="p-4 bg-neutral-900/90 border-l-2 border-white rounded-r text-white text-xs sm:text-sm font-medium">
              Private resources are accessed through your clinic-provided PIN.
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => setPinModalOpen(true)}
              className="w-full sm:w-auto bg-white text-black px-7 py-3.5 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Access Private Resources (PIN)</span>
            </button>
            <Link
              to="/resources"
              className="w-full sm:w-auto border border-neutral-700 hover:border-white text-neutral-200 hover:text-white px-6 py-3.5 rounded text-xs font-semibold uppercase tracking-widest text-center transition-colors"
            >
              View Resources Library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
