import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServicesPage: React.FC = () => {
  const { setBookingModalOpen } = useApp();
  const [selectedService, setSelectedService] = useState<'psychotherapy' | 'hypnotherapy' | 'wellbeing'>('psychotherapy');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="border-b border-neutral-200 pb-8 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 font-bold">
          Reality Mind Clinic · Section 3
        </span>
        <h1 className="font-garamond text-4xl sm:text-5xl font-bold text-neutral-950">
          Clinical Services & Methodologies
        </h1>
        <p className="text-xs sm:text-base text-neutral-600 leading-relaxed font-sans">
          Grounded in clinical science and tailored to individual cognitive landscapes. Available both in-clinic at Tak Mohalla Road, Bijbehara and via encrypted telehealth.
        </p>
      </div>

      {/* Main 3 Services Detailed Cards */}
      <div className="space-y-12">
        {/* Service 1: Psychotherapy */}
        <div className="border border-neutral-300 bg-white rounded-xl p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Primary Modality
              </span>
              <h2 className="font-garamond text-3xl font-bold text-neutral-950 mt-1">
                Psychotherapy
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              Structured talk-based therapy to understand and change unhelpful thoughts, emotions and behaviour. We integrate empirical CBT protocols with metacognitive clarity.
            </p>
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="bg-black text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Psychotherapy</span>
            </button>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Cognitive Restructuring
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Identifying distorted thinking biases (catastrophizing, all-or-nothing thinking, fortune telling) and testing thoughts against objective empirical facts.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Exposure & Response Prevention (ERP)
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                The gold-standard protocol for Obsessive Compulsive Disorder. Safely breaking compulsive neutralizing rituals to induce natural neurochemical habituation.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Behavioural Activation
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Systematic graduated reactivation targeting depressive inertia, establishing healthy mastery and pleasure loops before motivation is felt.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Metacognitive Defusion
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Learning to perceive intrusive ruminations as transient mental events rather than urgent realities demanding mental analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Service 2: Clinical Hypnotherapy */}
        <div className="border border-neutral-300 bg-white rounded-xl p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Subconscious Alignment
              </span>
              <h2 className="font-garamond text-3xl font-bold text-neutral-950 mt-1">
                Clinical Hypnotherapy
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              Guided, clinically applied hypnosis and relaxation techniques to support therapeutic change. Utilizing focused absorption to rewire deeply held autonomic reflexes and stress patterns.
            </p>
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="bg-black text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Hypnotherapy</span>
            </button>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Self-Hypnosis Training
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Patients master self-directed induction protocols so they can induce restorative alpha-theta brain states whenever stress triggers arise at home.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Systematic Desensitization
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Pairing imagined feared triggers with deep autonomic hypnotic relaxation (reciprocal inhibition) to permanently neutralize phobic alarms.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Ego Strengthening & Affirmation
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Installing deep psychological resilience, self-efficacy, and emotional self-soothing into the subconscious cognitive architecture.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Psychosomatic Stress Easing
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Downregulating gut irritability, tension headaches, and nervous somatic tremors through autonomic nervous system calming.
              </p>
            </div>
          </div>
        </div>

        {/* Service 3: Mental Health & Wellbeing */}
        <div className="border border-neutral-300 bg-white rounded-xl p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Preventative & Ongoing
              </span>
              <h2 className="font-garamond text-3xl font-bold text-neutral-950 mt-1">
                Mental Health & Wellbeing
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              Ongoing guidance, education and self-care practices for emotional balance and resilience. Designed to prevent relapse and build sustainable psychological flourishing.
            </p>
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="bg-black text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Wellbeing Session</span>
            </button>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                CBT for Insomnia (CBT-I)
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Comprehensive sleep hygiene, stimulus control, and circadian rhythm entrainment to end chronic sleeplessness without medication dependence.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Mindfulness & Attentional Control
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Cultivating present-moment anchoring to silence Default Mode Network (DMN) hyperactivity and eliminate compulsive overthinking.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Stress Buffering & Burnout Reset
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Boundary setting, emotional regulation tools, and somatic grounding to recover from occupational fatigue and academic overwhelm.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2">
              <h4 className="font-garamond text-lg font-bold text-neutral-900">
                Continuous Psychoeducation
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Free clinical articles and private homework guidance keeping patients informed and confident in their neurobiological journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Specialized Treatment Areas Section */}
      <div className="border-t border-neutral-200 pt-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
            Section 4
          </span>
          <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
            6 Core Clinical Treatment Areas
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Our evidence-based protocols directly target the underlying maintaining mechanisms of:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Anxiety & Panic',
              focus: 'Autonomic nervous system hyper-vigilance, racing pulse, panic attacks, shortness of breath, and anticipatory dread.',
              approach: 'Diaphragmatic Breathing Pacer + 5-4-3-2-1 Sensory Reset + CBT Decatastrophizing'
            },
            {
              name: 'Clinical Depression',
              focus: 'Depressive inertia, loss of interest (anhedonia), pervasive hopelessness, fatigue, and low self-worth.',
              approach: 'Graduated Behavioural Activation + Cognitive Distortions Log + Morning Anchoring'
            },
            {
              name: 'OCD (Obsessions & Compulsions)',
              focus: 'Intrusive taboo thoughts, contamination fears, symmetrical checking, and mental neutralizing rituals.',
              approach: 'Exposure and Response Prevention (ERP) + Compulsion Delay Ladders'
            },
            {
              name: 'Chronic Overthinking',
              focus: 'Relentless rumination, analyzing decisions repeatedly, insomnia due to racing thoughts, and mental exhaustion.',
              approach: 'Thought Defusion + 15-Minute Daily Worry Postponement + Mindfulness'
            },
            {
              name: 'Fear & Specific Phobias',
              focus: 'Acute irrational panic triggered by specific objects, travel, closed spaces, health anxiety, or social scrutiny.',
              approach: 'Systematic Desensitization + Safe Place Guided Imagery + Reciprocal Inhibition'
            },
            {
              name: 'Sleep Problems & Insomnia',
              focus: 'Conditioned bed-arousal, taking over 45 minutes to fall asleep, middle-of-night waking, and daytime fatigue.',
              approach: 'CBT-I Stimulus Control + Progressive Muscle Relaxation + Self-Hypnosis Induction'
            }
          ].map((area, i) => (
            <div
              key={i}
              className="border border-neutral-200 bg-white p-6 rounded-lg space-y-4 hover:border-black transition-all"
            >
              <h3 className="font-garamond text-xl font-bold text-neutral-950 flex items-center justify-between">
                <span>{area.name}</span>
                <span className="text-[10px] font-mono text-neutral-400">0{i + 1}</span>
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                {area.focus}
              </p>
              <div className="pt-2 border-t border-neutral-100 text-[11px]">
                <span className="font-bold text-neutral-900 block mb-1">Targeted Protocol:</span>
                <span className="text-neutral-600">{area.approach}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
