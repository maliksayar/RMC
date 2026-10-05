import React from 'react';
import {
  KeyRound,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Maximize2,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClinicLogo } from '../components/ClinicLogo';

export const HomePage: React.FC = () => {
  const {
    setPinModalOpen,
    setBookingModalOpen
  } = useApp();

  const [galleryModalOpen, setGalleryModalOpen] = React.useState(false);

  const helpAreas = [
    {
      title: 'Anxiety & Excessive Worry',
      desc: 'Persistent worry, nervousness, restlessness, or feeling constantly on edge. You may find it difficult to switch off your thoughts, relax, concentrate, or feel reassured even when things are objectively safe.'
    },
    {
      title: 'Panic Attacks & Fear',
      desc: 'Sudden episodes of intense fear or discomfort that may involve a racing heart, breathlessness, dizziness, trembling, chest discomfort, or a feeling that something is seriously wrong. Some people also develop fear of having another attack.'
    },
    {
      title: 'Social Anxiety',
      desc: 'Intense fear of being judged, embarrassed, rejected, or negatively evaluated by others. You may avoid conversations, social situations, speaking in front of people, or situations where you feel observed.'
    },
    {
      title: 'Phobias',
      desc: 'Strong and persistent fear of a particular object, situation, place, animal, medical procedure, or other trigger. The fear may lead to avoidance even when you know the situation is unlikely to cause serious harm.'
    },
    {
      title: 'OCD (Obsessions & Compulsions)',
      desc: 'Unwanted and intrusive thoughts, images, or urges that cause distress, along with repetitive behaviours or mental rituals used to reduce anxiety or prevent something feared from happening.'
    },
    {
      title: 'Depression & Low Mood',
      desc: 'Persistent sadness, emptiness, loss of interest or pleasure, low motivation, fatigue, changes in sleep or appetite, feelings of hopelessness, or difficulty managing everyday responsibilities.'
    },
    {
      title: 'Trauma-Related Difficulties',
      desc: 'Distressing memories or reminders of a traumatic experience, avoidance, heightened alertness, strong emotional or physical reactions, nightmares, difficulty feeling safe, or changes in mood and relationships.'
    },
    {
      title: 'Dissociation & Disconnection',
      desc: 'Feeling detached from yourself or your surroundings, feeling emotionally numb or unreal, losing track of periods of time, or experiencing a sense of disconnection from your thoughts, emotions, body, or surroundings.'
    },
    {
      title: 'Stress & Sleep Difficulties',
      desc: 'Ongoing stress, emotional overwhelm, difficulty switching off, racing thoughts at night, difficulty falling or staying asleep, or feeling mentally and physically exhausted.'
    }
  ];

  const considerHelpPoints = [
    'Constant worry, nervousness, or feeling on edge, even when things seem okay',
    'Sudden intense fear or panic, with a racing heart, breathlessness, dizziness, trembling, or a feeling that something is seriously wrong',
    'Low mood, sadness, loss of interest, low energy, or difficulty managing everyday life',
    'Unwanted thoughts or images that keep coming back, along with repeated checking, cleaning, counting, or other actions that feel difficult to stop',
    'Avoiding people, places, situations, or activities because you are afraid, uncomfortable, or worried about what might happen',
    'Disturbing memories, nightmares, or feeling unusually alert or unsafe after a stressful or traumatic experience',
    'Feeling disconnected from yourself or your surroundings, emotionally numb, unreal, or as if things are happening from a distance',
    'Difficulty sleeping, racing thoughts at night, or feeling tired most of the time',
    'Physical symptoms that become worse during stress, such as headaches, muscle tension, stomach discomfort, or digestive problems',
    'Changes in eating or appetite that seem connected to periods of stress or emotional distress'
  ];

  const whyUsPoints = [
    {
      title: 'Beyond Symptoms',
      desc: 'Therapy goes beyond treating symptoms. We work with the underlying beliefs, learned patterns, emotions, and behaviours that can contribute to psychological difficulties.'
    },
    {
      title: 'Specialized Clinical Hypnotherapy',
      desc: 'Clinical hypnotherapy is a specialized focus of our practice, used therapeutically for concerns such as anxiety, panic, phobias, trauma-related difficulties, stress, and sleep problems, where clinically appropriate.'
    },
    {
      title: 'Integrative Therapeutic Approach',
      desc: "Different difficulties require different approaches. We may combine CBT, REBT, clinical hypnotherapy, and other psychological methods according to the individual's needs."
    },
    {
      title: 'Therapeutic Intervention Training',
      desc: 'Appropriate therapeutic interventions are personally demonstrated and practised under the guidance and supervision of the therapist, so clients understand how to perform them correctly and safely.'
    },
    {
      title: 'Personalized Therapeutic Intervention Plan',
      desc: 'When appropriate, clients receive a personalized Therapeutic Intervention Plan (TIP) outlining the interventions recommended for practice between consultations, along with access to selected therapeutic resources through a private clinic-provided PIN.'
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
              Psychotherapy & Clinical Hypnotherapy — In-Clinic & Online
            </h1>

            <p className="text-neutral-600 text-xs sm:text-base max-w-2xl mt-4 leading-relaxed font-sans">
              Evidence-informed psychological care tailored to your needs, with personalized therapeutic interventions and guidance beyond the consultation room.
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

            {/* Location & Practice Contact Bar */}
            <div className="mt-10 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between w-full text-xs text-neutral-600 gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-700" />
                <span>Tak Mohalla Road, Bijbehara, Anantnag — 192124</span>
              </div>
              <div className="flex items-center gap-3">
                <a href="tel:6005754205" className="hover:text-black font-semibold">
                  Contact: +91 6005754205
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT REALITY MIND CLINIC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-lg space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Section 1
          </span>
          <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
            About Reality Mind Clinic
          </h2>
          <div className="space-y-3 max-w-4xl text-neutral-700 text-xs sm:text-sm leading-relaxed font-sans">
            <p>
              Reality Mind Clinic provides psychotherapy and clinical hypnotherapy through both in-clinic and online consultations.
            </p>
            <p>
              Alongside consultations, clients may receive personalized therapeutic interventions and guidance to support their work between sessions. Selected resources are securely accessed through a private PIN provided by the clinic.
            </p>
            <p>
              The website also provides simple, evidence-informed educational resources to help you understand psychological difficulties, psychotherapy, and different therapeutic approaches.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT CAN I HELP YOU WITH? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-lg space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 2
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
              What Can I Help You With?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans pt-1">
              Psychological difficulties can affect thoughts, emotions, behaviour, relationships, and everyday functioning. Understanding what you're experiencing is the first step toward finding appropriate care.
            </p>
          </div>

          {/* 9 Difficulties Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {helpAreas.map((item, idx) => (
              <div
                key={idx}
                className="border border-neutral-200 bg-neutral-50/50 p-6 rounded-lg hover:border-neutral-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-garamond text-xl font-bold text-neutral-950 leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 mt-2.5 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Clinical Assessment Disclaimer */}
          <div className="p-4 bg-neutral-50 border-l-2 border-neutral-900 rounded-r text-xs sm:text-sm text-neutral-700 italic">
            These descriptions are not a diagnosis. Similar experiences can occur for different reasons, and a professional assessment can help clarify what may be happening.
          </div>
        </div>
      </section>

      {/* SECTION 3: WHEN TO CONSIDER PROFESSIONAL HELP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-lg space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 3
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
              When to Consider Professional Help
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans pt-1">
              You may consider professional support if you often experience:
            </p>
          </div>

          {/* Checklist / Indicators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {considerHelpPoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-md border border-neutral-200/80 bg-neutral-50/50 hover:border-neutral-900 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 shrink-0"></div>
                <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-sans">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Impact & Call-to-action note */}
          <div className="p-4 bg-neutral-50 border-l-2 border-neutral-900 rounded-r text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
            If these experiences are affecting your daily life, relationships, work, studies, or social life, it may be time to consider professional psychological support.
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW THERAPY CAN HELP? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-lg space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 4
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
              How Therapy Can Help?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What Is Psychotherapy */}
            <div className="border border-neutral-200/90 bg-neutral-50/40 p-6 sm:p-8 rounded-lg space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
                Evidence-Based Clinical Framework
              </span>
              <h3 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
                What Is Psychotherapy
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                <p>
                  Psychotherapy is not simply talking about problems, receiving advice, or being told to “think positively.” It is a form of psychological treatment designed to create meaningful changes in the way a person thinks, feels, behaves, and responds to their experiences.
                </p>
                <p>
                  It involves working therapeutically with the psychological patterns that contribute to and maintain distress — including learned beliefs, emotional responses, behaviours, memories, expectations, and ways of interpreting and responding to experiences.
                </p>
                <p>
                  Some of these patterns develop through childhood and later life experiences and may continue to influence us automatically, without being fully within conscious awareness. Psychotherapy can help identify, examine, and modify these patterns, allowing new and more adaptive ways of thinking, feeling, and responding to develop.
                </p>
              </div>
            </div>

            {/* What Is Clinical Hypnotherapy */}
            <div className="border border-neutral-200/90 bg-neutral-50/40 p-6 sm:p-8 rounded-lg space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
                Focused Therapeutic State
              </span>
              <h3 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
                What Is Clinical Hypnotherapy
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                <p>
                  Clinical hypnotherapy is not the kind of hypnosis portrayed in movies or stage performances. It is the therapeutic use of clinical hypnosis within psychological treatment.
                </p>
                <p>
                  Clinical hypnosis involves focused attention and increased responsiveness to therapeutic suggestions. In an appropriate therapeutic context, it can be used to work with automatic responses, emotional patterns, learned associations, and other psychological processes that may not always be fully accessible to conscious awareness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY REALITY MIND CLINIC? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white p-8 sm:p-10 rounded-lg space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 5
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
              Why Reality Mind Clinic?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {whyUsPoints.map((item, idx) => (
              <div
                key={idx}
                className="border border-neutral-200/90 bg-neutral-50/50 p-6 rounded-lg hover:border-neutral-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-garamond text-xl font-bold text-neutral-950 leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 mt-2.5 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: MEET THE THERAPIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white p-8 sm:p-12 rounded-lg space-y-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 6 · Practice Leadership
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950 mt-1">
              Meet the Therapist
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Therapist Formal Portrait */}
            <div className="lg:col-span-4 max-w-sm mx-auto lg:mx-0 w-full">
              <div className="relative aspect-3/4 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm group">
                <img
                  src="/therapist/yehya-hassan-portrait.png"
                  alt="Yehya Hassan - Psychotherapist & Clinical Hypnotherapist"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/35 to-transparent p-4 text-white">
                  <span className="text-sm font-semibold block">
                    Yehya Hassan
                  </span>
                  <span className="text-[11px] text-neutral-300">
                    Psychotherapist & Clinical Hypnotherapist
                  </span>
                </div>
              </div>
            </div>

            {/* Therapist Bio & Philosophy */}
            <div className="lg:col-span-8 space-y-5">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-medium">
                  Assalamu Alaikum (Peace be upon you)
                </span>
                <h3 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950">
                  I am Yehya Hassan
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                <p>
                  I am a Psychotherapist and Clinical Hypnotherapist with an integrative approach to psychological treatment.
                </p>
                <p>
                  My work focuses on looking beyond symptoms to understand the underlying beliefs, learned patterns, emotional responses, and behaviours that may contribute to psychological difficulties.
                </p>
                <div className="p-4 sm:p-5 bg-neutral-50 border-l-2 border-neutral-900 rounded-r text-xs sm:text-sm text-neutral-900 font-medium leading-relaxed italic">
                  “I believe meaningful therapeutic change begins with understanding what keeps a difficulty going — and working with those patterns through the right therapeutic approach.”
                </div>
              </div>

              {/* Consultation Booking Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  Book Consultation with Yehya
                </button>
                <a
                  href="https://wa.me/916005754205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border border-neutral-300 hover:border-black text-neutral-900 px-6 py-3 rounded text-xs font-semibold uppercase tracking-widest text-center transition-colors"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WORDS AND MOMENTS (PHOTO GALLERY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-neutral-200 bg-white p-8 sm:p-12 rounded-lg space-y-6">
          <div className="border-b border-neutral-100 pb-5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              Section 7
            </span>
            <h2 className="font-garamond text-3xl sm:text-4xl font-bold text-neutral-950 mt-1">
              Words and Moments
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-sans">
              A gallery of artwork, letters, and tokens of gratitude created and gifted by clients to therapist
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {/* Gallery Photo Item */}
            <div className="flex flex-col">
              <div
                onClick={() => setGalleryModalOpen(true)}
                className="group relative cursor-pointer rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-900">
                  <img
                    src="/therapist/yehya-hassan-clinic.jpg"
                    alt="Received on 30 August 2026"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Note and date below the image */}
              <div className="pt-3.5 space-y-1 text-center sm:text-left">
                <p className="text-xs sm:text-[13px] text-neutral-700 italic leading-relaxed font-sans">
                  “Today, I received this beautiful piece of art from my client. It means a lot to me. Thank you, dear.”
                </p>
                <span className="text-[11px] font-medium text-neutral-400 block font-mono">
                  30 August 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY PHOTO LIGHTBOX MODAL */}
      {galleryModalOpen && (
        <div
          onClick={() => setGalleryModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-white rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[80vh] overflow-hidden bg-neutral-950 flex items-center justify-center">
              <img
                src="/therapist/yehya-hassan-clinic.jpg"
                alt="Received on 30 August 2026"
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 bg-white border-t border-neutral-200 space-y-1 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed font-sans">
                “Today, I received this beautiful piece of art from my client. It means a lot to me. Thank you, dear.”
              </p>
              <span className="text-[11px] font-medium text-neutral-400 block font-mono">
                30 August 2026
              </span>
            </div>
          </div>
        </div>
      )}

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
