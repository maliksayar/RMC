import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setBookingModalOpen } = useApp();

  const clinicalAreas = [
    'Anxiety and excessive worry',
    'Panic attacks and fear',
    'Social anxiety',
    'Phobias',
    'OCD-related difficulties',
    'Depression and low mood',
    'Trauma-related difficulties',
    'Dissociation and feelings of disconnection',
    'Stress and sleep difficulties',
    'Psychosomatic and stress-related physical symptoms'
  ];

  return (
    <div className="space-y-16 py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header & Hero Intro */}
      <section className="border border-neutral-300 bg-white p-6 sm:p-12 rounded-xl shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Portrait Photo */}
          <div className="lg:col-span-4 max-w-sm mx-auto lg:mx-0 w-full">
            <div className="relative aspect-3/4 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm group">
              <img
                src="/therapist/yehya-hassan-portrait.png"
                alt="Yehya Hassan - Psychotherapist & Clinical Hypnotherapist"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/35 to-transparent p-4 text-white">
                <span className="text-sm font-semibold block">Yehya Hassan</span>
                <span className="text-[11px] text-neutral-300">
                  Psychotherapist & Clinical Hypnotherapist
                </span>
              </div>
            </div>
          </div>

          {/* Intro Text */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-medium">
                Assalamu Alaikum (Peace be upon you)
              </span>
              <h1 className="font-garamond text-3xl sm:text-5xl font-bold text-neutral-950">
                About Your Therapist
              </h1>
              <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-800">
                I am Yehya Hassan
              </h2>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              <p>
                I am a trained Psychotherapist and Clinical Hypnotherapist with an integrative approach to psychological treatment.
              </p>
              <p>
                My work focuses on looking beyond symptoms to understand the underlying beliefs, learned patterns, emotional responses, and behaviours that may contribute to psychological difficulties.
              </p>
              <p className="font-medium text-neutral-900">
                I believe effective therapy begins with understanding the individual, their specific patterns, and the underlying difficulties contributing to what they are experiencing.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="w-full sm:w-auto bg-black text-white px-7 py-3.5 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </button>
              <a
                href="https://wa.me/916005754205"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-neutral-300 hover:border-black text-neutral-900 px-6 py-3.5 rounded text-xs font-semibold uppercase tracking-widest text-center transition-colors"
              >
                WhatsApp Practice
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. My Approach to Therapy */}
      <section className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-xl space-y-6">
        <div className="flex items-center gap-2.5 text-neutral-900 border-b border-neutral-100 pb-4">
          <Layers className="w-5 h-5" />
          <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
            My Approach to Therapy
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
          <p className="font-medium text-neutral-900 text-sm sm:text-base">
            Psychological difficulties are not always as simple as the symptoms we notice on the surface.
          </p>
          <p>
            Therapeutic work involves understanding the patterns that may be contributing to or maintaining a difficulty, and then working with those patterns through appropriate psychological methods.
          </p>
          <p>
            Depending on the individual's concerns and needs, my work may integrate approaches such as <span className="font-semibold text-neutral-900">CBT, REBT, ACT, clinical hypnotherapy</span>, and other psychological methods.
          </p>
          <div className="p-4 sm:p-5 bg-neutral-50 border-l-2 border-neutral-900 rounded-r text-xs sm:text-sm text-neutral-900 italic font-medium">
            “The aim is not simply to manage symptoms, but to understand what is contributing to the difficulty and what keeps it going, and then work toward meaningful therapeutic change.”
          </div>
        </div>
      </section>

      {/* 3. Clinical Areas of Focus */}
      <section className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-xl space-y-6">
        <div className="border-b border-neutral-100 pb-4">
          <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
            Clinical Areas of Focus
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Specialized areas addressed through structured clinical consultation:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {clinicalAreas.map((area, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200/80 bg-neutral-50/50 hover:border-neutral-900 transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-[13px] text-neutral-800 font-medium font-sans">
                {area}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Clinical Hypnotherapy */}
      <section className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-xl space-y-6">
        <div className="flex items-center gap-2.5 text-neutral-900 border-b border-neutral-100 pb-4">
          <Sparkles className="w-5 h-5" />
          <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
            Clinical Hypnotherapy
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
          <p className="font-medium text-neutral-900 text-sm sm:text-base">
            Clinical hypnotherapy is a specialized focus of my practice.
          </p>
          <p>
            It involves the therapeutic use of clinical hypnosis within psychological treatment and may be integrated with psychotherapy when appropriate.
          </p>
          <p>
            It can be considered for concerns such as anxiety, panic, phobias, stress, sleep difficulties, and trauma-related difficulties, depending on the individual's needs and suitability.
          </p>
        </div>
      </section>

      {/* 5. Education, Clinical Training & Research */}
      <section className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-xl space-y-6">
        <div className="flex items-center gap-2.5 text-neutral-900 border-b border-neutral-100 pb-4">
          <GraduationCap className="w-5 h-5" />
          <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
            Education, Clinical Training & Research
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
          <p>
            I hold a <span className="font-semibold text-neutral-900">Bachelor’s (Honours) in Psychology</span>, along with six months of supervised clinical training in a hospital setting under one-to-one supervision of an experienced psychologist.
          </p>
          <p>
            During my clinical training, I gained practical exposure to psychological assessment, diagnostic understanding, case formulation, treatment planning, and therapeutic interventions. I also had clinical exposure to psychological difficulties, emergency situations, inpatient wards, and general hospital settings.
          </p>
          <p>
            I have also completed a <span className="font-semibold text-neutral-900">Diploma in Clinical Hypnotherapy</span> from the Indian Hypnosis Academy, where I received one-to-one training and supervision from Dr. J. P. Malik. In addition, I have completed other certifications and training in clinical hypnotherapy, as well as a <span className="font-semibold text-neutral-900">Diploma in Nutrition & Health Education</span>.
          </p>
          <p>
            My academic and clinical interests have also included dissociative disorders, with approximately one year of research experience focused on dissociation and dissociative disorders.
          </p>
        </div>
      </section>

      {/* 6. Professional Experience */}
      <section className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-xl space-y-6">
        <div className="flex items-center gap-2.5 text-neutral-900 border-b border-neutral-100 pb-4">
          <Briefcase className="w-5 h-5" />
          <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
            Professional Experience
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
          <p>
            I have over <span className="font-semibold text-neutral-900">two years of professional experience</span> working as a Psychotherapist, providing psychological support and therapeutic interventions to individuals experiencing a range of psychological and emotional difficulties.
          </p>
          <p>
            My clinical experience has strengthened my interest in understanding psychological difficulties beyond their surface symptoms and in developing therapeutic interventions according to the individual's needs.
          </p>
        </div>
      </section>

      {/* 7. How I Work & CTA */}
      <section className="border border-neutral-900 bg-neutral-950 text-white p-8 sm:p-12 rounded-xl space-y-6">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-white" />
            <span>Therapeutic Partnership</span>
          </div>
          <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-white">
            How I Work
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            <p>
              I believe effective therapy begins with understanding the individual, their specific patterns, and the underlying difficulties contributing to their concerns.
            </p>
            <p>
              The first step is to understand what you are experiencing, explore the factors that may be contributing to it, and identify patterns that may be maintaining the difficulty.
            </p>
            <p>
              From there, an appropriate therapeutic approach and intervention plan can be discussed based on your individual needs.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="bg-white text-black px-7 py-3.5 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-sm"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
