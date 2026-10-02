import React from 'react';
import { Link } from 'react-router-dom';
import {
  KeyRound,
  Calendar,
  ShieldCheck,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Phone,
  Video,
  MapPin,
  Lock,
  Unlock,
  Play,
  HeartHandshake,
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClinicLogo } from '../components/ClinicLogo';

export const HomePage: React.FC = () => {
  const {
    setPinModalOpen,
    setBookingModalOpen,
    interventions,
    unlockedVideoIds,
    setActiveVideo,
    articles,
    setActiveArticle
  } = useApp();

  const treatmentAreas = [
    {
      title: 'Anxiety',
      desc: 'Panic attacks, somatic tension, social anxiety, and autonomic hyperarousal.',
      interventions: 'Diaphragmatic Breathing, 5-4-3-2-1 Grounding, CBT Basics'
    },
    {
      title: 'Depression',
      desc: 'Pervasive low mood, loss of interest, cognitive fog, and motivational inertia.',
      interventions: 'Behavioural Activation, CBT Restructuring'
    },
    {
      title: 'OCD',
      desc: 'Intrusive obsessions and compulsive checking, washing, or mental neutralizing.',
      interventions: 'Exposure and Response Prevention (ERP)'
    },
    {
      title: 'Overthinking',
      desc: 'Chronic catastrophic rumination, decision paralysis, and relentless mental loops.',
      interventions: 'Thought Defusion, Worry Postponement, Mindfulness'
    },
    {
      title: 'Fear & Phobias',
      desc: 'Specific triggers, agoraphobia, claustrophobia, and avoidance behaviors.',
      interventions: 'Systematic Desensitization, Guided Imagery'
    },
    {
      title: 'Sleep Problems',
      desc: 'Chronic sleep-onset insomnia, middle-of-the-night waking, and racing thoughts.',
      interventions: 'CBT for Insomnia (CBT-I), PMR, Self-Hypnosis'
    }
  ];

  const howItWorksSteps = [
    {
      step: '1',
      title: 'Patient Registration',
      desc: 'Secure account creation powered by Firebase Auth, with private role-based patient profiles.'
    },
    {
      step: '2',
      title: 'Consultation Booking',
      desc: 'Book an in-clinic consultation at Tak Mohalla Road, Bijbehara or an online video/audio session.'
    },
    {
      step: '3',
      title: 'Psychological Consultation',
      desc: 'The Psychologist conducts diagnostic formulation and identifies core maintaining mechanisms.'
    },
    {
      step: '4',
      title: 'Prescription & PIN Generation',
      desc: 'The Psychologist selects targeted intervention videos and issues a unique, time-limited PIN.'
    },
    {
      step: '5',
      title: 'Secure Interventions Unlock',
      desc: 'The patient enters the PIN to stream private clinical exercises via signed, encrypted media links.'
    },
    {
      step: '6',
      title: 'Continuous Guided Recovery',
      desc: 'Daily practice, symptom monitoring, appointment follow-ups, and psychoeducational guidance.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Editorial Hero Frame matching Synopsis Style */}
      <section className="pt-10 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border border-neutral-300 bg-white p-6 sm:p-14 rounded-lg shadow-xs relative overflow-hidden">
          {/* Thin inner double hairline border matching clinic card */}
          <div className="border border-neutral-200 p-6 sm:p-10 rounded-xs flex flex-col items-center text-center">
            {/* Clinic Logo Mark & Wordmark matching Card */}
            <div className="mb-4">
              <ClinicLogo size="xl" layout="vertical" showWordmark={true} showTagline={true} />
            </div>

            {/* Subtitle */}
            <h1 className="font-garamond text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mt-6 max-w-3xl leading-tight">
              A Web-Based Psychological Consultation and Patient Guidance Platform
            </h1>

            <p className="text-neutral-600 text-xs sm:text-base max-w-2xl mt-4 leading-relaxed font-sans">
              Bridging in-clinic psychological practice with continuous digital therapeutic guidance.
              Consult online or in-clinic at Bijbehara, and receive personalized PIN-unlocked intervention videos for verified, lasting recovery.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="w-full sm:w-auto bg-black text-white px-7 py-3.5 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>

              <button
                type="button"
                onClick={() => setPinModalOpen(true)}
                className="w-full sm:w-auto border-2 border-neutral-900 text-neutral-900 px-7 py-3 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Enter Access PIN</span>
              </button>
            </div>

            {/* Tech Specs & Meta Grid matching Synopsis Page 1 */}
            <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-3 border-t border-neutral-200 pt-6 text-xs text-neutral-600 gap-4 sm:gap-0">
              <div className="sm:border-r sm:border-neutral-200 sm:pr-4">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                  Tech Stack
                </span>
                <span className="font-semibold text-neutral-800">React + Firebase + Cloudinary</span>
              </div>
              <div className="sm:border-r sm:border-neutral-200 sm:px-4">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                  Typography
                </span>
                <span className="font-semibold text-neutral-800">Garamond + Plus Jakarta Sans</span>
              </div>
              <div className="sm:pl-4">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                  Platform
                </span>
                <span className="font-semibold text-neutral-800">Web Responsive · Tak Mohalla Road</span>
              </div>
            </div>

            {/* Location & Contact Bar */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between w-full text-xs text-neutral-500 gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-700" />
                <span>Tak Mohalla Road, Bijbehara, Anantnag - 192124</span>
              </div>
              <div className="flex items-center gap-3">
                <a href="tel:6005754205" className="hover:text-black font-semibold">
                  Contact: 6005754205
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 & 2: INTRODUCTION & OBJECTIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-neutral-200 bg-white p-8 rounded-lg space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 1
            </span>
            <h2 className="font-garamond text-3xl font-bold text-neutral-950">
              Clinical Introduction
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              Reality Mind Clinic is a web-based psychological consultation and patient guidance platform. It brings the clinic's practice online by offering online and offline appointment booking, private educational videos on specific psychological interventions, and psychology-related blogs and articles.
            </p>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              Patients register on the platform and book appointments with the Psychologist, either online or in the clinic. After a consultation, the Psychologist can issue a unique PIN/access code to a specific patient, unlocking selected private intervention videos meant for that patient's care.
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-8 rounded-lg space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 2
            </span>
            <h2 className="font-garamond text-3xl font-bold text-neutral-950">
              Clinical Objective
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              To provide patients with professional psychological consultation and continuous guidance through appointments, personalized private intervention videos, and educational written content, while giving the Psychologist complete control over patient access and content management.
            </p>
            <div className="p-4 bg-neutral-50 border-l-2 border-neutral-900 rounded-r text-xs text-neutral-800 italic mt-4">
              "Ensuring the patient is never left stranded between consultations, by supplying tailored video exercises and clear step-by-step psychological homework."
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CLINIC SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 3
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
              Clinic Services
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              The platform presents the exact clinical services offered at our Bijbehara center:
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs font-semibold uppercase tracking-wider text-black flex items-center gap-1 hover:underline"
          >
            <span>View Detailed Modalities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Psychotherapy */}
          <div className="border border-neutral-200 bg-white p-6 rounded-lg space-y-4 hover:border-black transition-all">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                Talk-Based Therapy
              </span>
              <h3 className="font-garamond text-2xl font-bold text-neutral-950 mt-0.5">
                Psychotherapy
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Structured talk-based therapy to understand and change unhelpful thoughts, emotions, and behaviour. Grounded in Cognitive Behavioural Therapy (CBT) and Acceptance & Commitment frameworks.
            </p>
            <div className="pt-2 text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-neutral-900" />
              <span>CBT, ERP & Behavioural Activation</span>
            </div>
          </div>

          {/* Clinical Hypnotherapy */}
          <div className="border border-neutral-200 bg-white p-6 rounded-lg space-y-4 hover:border-black transition-all">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                Subconscious Reframing
              </span>
              <h3 className="font-garamond text-2xl font-bold text-neutral-950 mt-0.5">
                Clinical Hypnotherapy
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Guided, clinically applied hypnosis and relaxation techniques to support therapeutic change. Unlocking subconscious pathways for habit breaking, deep stress relief, and phobia resolution.
            </p>
            <div className="pt-2 text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-neutral-900" />
              <span>Self-Hypnosis & Trance Inductions</span>
            </div>
          </div>

          {/* Mental Health & Wellbeing */}
          <div className="border border-neutral-200 bg-white p-6 rounded-lg space-y-4 hover:border-black transition-all">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                Preventative Resilience
              </span>
              <h3 className="font-garamond text-2xl font-bold text-neutral-950 mt-0.5">
                Mental Health & Wellbeing
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Ongoing guidance, psychoeducation, and self-care practices for emotional balance, sleep hygiene, and long-term psychological resilience.
            </p>
            <div className="pt-2 text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-neutral-900" />
              <span>Lifestyle Entrainment & Stress Buffering</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TREATMENT AREAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-neutral-200 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Section 4
          </span>
          <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
            Treatment Areas
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Specialized psychological care pathways addressing high-prevalence psychiatric and emotional concerns:
          </p>
        </div>

        {/* Treatment Areas Table Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {treatmentAreas.map((area, idx) => (
            <div
              key={idx}
              className="border border-neutral-200 bg-white p-5 rounded-md hover:border-neutral-900 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-garamond text-xl font-bold text-neutral-950">
                    {area.title}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400">
                    AREA 0{idx + 1}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  {area.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
                <span className="font-semibold text-neutral-900 block mb-0.5">Assigned Interventions:</span>
                <span>{area.interventions}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 & 8: HOW IT WORKS + PRIVATE INTERVENTION PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-neutral-900 text-white rounded-xl p-8 sm:p-12 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 8 · Patient Journey
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-white">
              How the Consultation & Video Prescription System Works
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              Unlike generic self-help apps, Reality Mind Clinic couples clinical diagnosis with private, doctor-controlled video access codes.
            </p>
          </div>

          {/* 6 Step Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {howItWorksSteps.map((s) => (
              <div
                key={s.step}
                className="border border-neutral-800 bg-neutral-950/60 p-5 rounded-lg space-y-2 relative"
              >
                <span className="text-3xl font-garamond font-bold text-neutral-600">
                  0{s.step}
                </span>
                <h4 className="font-garamond text-lg font-bold text-neutral-100">
                  {s.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* PIN Action Callout */}
          <div className="border border-neutral-700 bg-neutral-800/80 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-garamond text-xl font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-400" />
                <span>Already Have a Doctor-Issued Access PIN?</span>
              </h4>
              <p className="text-xs text-neutral-300">
                Enter your 6-character code (e.g. <span className="font-mono font-bold text-white">RMC-2026</span>) to unlock your prescribed video sessions.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPinModalOpen(true)}
              className="bg-white text-black px-6 py-2.5 rounded font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors shrink-0"
            >
              Enter PIN Now
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7 PREVIEW: PRIVATE INTERVENTION LIBRARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-neutral-200 pb-4 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 7 · Starting Library (13 Interventions)
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
              Psychological Interventions Library
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Each private video is named after a specific psychological intervention, assigned precisely after consultation.
            </p>
          </div>

          <Link
            to="/interventions"
            className="text-xs font-semibold uppercase tracking-wider text-black flex items-center gap-1 hover:underline"
          >
            <span>View All 13 Videos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Featured Interventions Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {interventions.slice(0, 4).map((video) => {
            const isUnlocked = unlockedVideoIds.includes(video.id);

            return (
              <div
                key={video.id}
                className="border border-neutral-200 bg-white rounded-lg overflow-hidden flex flex-col justify-between hover:border-black transition-all group"
              >
                <div>
                  <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                    />
                    <div className="absolute top-2 right-2">
                      {isUnlocked ? (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <Unlock className="w-2.5 h-2.5" />
                          <span>Unlocked</span>
                        </span>
                      ) : (
                        <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          <span>Locked</span>
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                      {video.category}
                    </span>
                    <h4 className="font-garamond text-lg font-bold text-neutral-950 leading-snug">
                      {video.title}
                    </h4>
                    <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (isUnlocked) {
                        setActiveVideo(video);
                      } else {
                        setPinModalOpen(true);
                      }
                    }}
                    className={`w-full py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                      isUnlocked
                        ? 'bg-black text-white hover:bg-neutral-800'
                        : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Launch Session</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Enter PIN to Play</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PSYCHOEDUCATION BLOG SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-neutral-200 pb-4 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 5 · Clinical Articles
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
              Psychology Guidance & Articles
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Public psychoeducation on anxiety, sleep, and overthinking curated by our clinical team.
            </p>
          </div>

          <Link
            to="/articles"
            className="text-xs font-semibold uppercase tracking-wider text-black flex items-center gap-1 hover:underline"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="border border-neutral-200 bg-white rounded-lg overflow-hidden hover:border-black transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-16/9 overflow-hidden bg-neutral-100">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                    <span className="uppercase font-bold tracking-wider">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-garamond text-xl font-bold text-neutral-950 leading-snug group-hover:underline">
                    {art.title}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 text-xs font-semibold text-neutral-900 flex items-center gap-1">
                <span>Read Full Guidance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLINIC APPOINTMENT CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-neutral-900 bg-neutral-950 text-white rounded-xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] uppercase font-mono tracking-widest text-neutral-400">
              Direct Clinical Care
            </span>
            <h3 className="font-garamond text-3xl sm:text-4xl font-bold text-white">
              Schedule Your In-Clinic or Online Consultation
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              Tak Mohalla Road, Bijbehara, Anantnag - 192124. Telehealth consultations are also available across Kashmir and worldwide.
            </p>
            <div className="flex items-center gap-4 text-xs pt-1 text-neutral-300">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-white" />
                <span>6005754205</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-white" />
                <span>Mon–Sat 10 AM – 6 PM</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="bg-white text-black px-6 py-3.5 rounded font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Book Consultation Slot
            </button>
            <a
              href="https://wa.me/916005754205"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-700 hover:border-white px-6 py-3.5 rounded font-semibold text-xs uppercase tracking-widest text-center transition-colors text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
