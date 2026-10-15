import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User as UserIcon,
  KeyRound,
  Calendar,
  Play,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Activity,
  Heart,
  Wind,
  Compass,
  AlertTriangle,
  BookOpen,
  MessageCircle,
  Phone,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Brain,
  Search,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InterventionVideo, Appointment } from '../types';

interface ThoughtRecord {
  id: string;
  date: string;
  situation: string;
  negativeThought: string;
  distortion: string;
  emotion: string;
  intensity: number;
  rationalResponse: string;
  newIntensity: number;
}

export const PatientPortal: React.FC = () => {
  const {
    currentUser,
    isAdmin,
    activeUnlockedPin,
    unlockedVideoIds,
    interventions,
    appointments,
    setActiveVideo,
    setPinModalOpen,
    setBookingModalOpen,
    verifyAndUnlockPin
  } = useApp();

  const [activeTab, setActiveTab] = useState<'prescriptions' | 'tools' | 'appointments' | 'cbt-log' | 'doctor'>('prescriptions');

  // Inline PIN Unlock State
  const [pinInput, setPinInput] = useState('');
  const [pinFeedback, setPinFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Video Filter & Search
  const [videoFilter, setVideoFilter] = useState<string>('all');
  const [videoSearch, setVideoSearch] = useState('');

  // Interactive Breath Pacer State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathCount, setBreathCount] = useState(4);

  // CBT Thought Record State
  const [records, setRecords] = useState<ThoughtRecord[]>(() => {
    const saved = localStorage.getItem(`rmc_cbt_${currentUser?.id || 'guest'}`);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'cbt-demo-1',
            date: '2026-10-12',
            situation: 'Preparing to give an update during a clinic team meeting',
            negativeThought: 'I will stumble on my words and everyone will think I am incompetent.',
            distortion: 'Catastrophizing & Mind Reading',
            emotion: 'Anxiety',
            intensity: 8,
            rationalResponse: 'I have prepared my notes well. Even if I hesitate, it is normal and human; my worth does not depend on a flawless delivery.',
            newIntensity: 3
          }
        ];
  });

  const [newSituation, setNewSituation] = useState('');
  const [newThought, setNewThought] = useState('');
  const [newDistortion, setNewDistortion] = useState('Catastrophizing');
  const [newEmotion, setNewEmotion] = useState('Anxiety');
  const [newIntensity, setNewIntensity] = useState(7);
  const [newRational, setNewRational] = useState('');
  const [newReRated, setNewReRated] = useState(3);
  const [cbtSuccess, setCbtSuccess] = useState(false);

  // Save thought records
  useEffect(() => {
    if (currentUser?.id) {
      localStorage.setItem(`rmc_cbt_${currentUser.id}`, JSON.stringify(records));
    }
  }, [records, currentUser?.id]);

  // Breathing pacer loop
  useEffect(() => {
    if (!isBreathing) return;

    let timer: any;
    if (breathPhase === 'Inhale') {
      if (breathCount > 1) {
        timer = setTimeout(() => setBreathCount((c) => c - 1), 1000);
      } else {
        setBreathPhase('Hold');
        setBreathCount(4);
      }
    } else if (breathPhase === 'Hold') {
      if (breathCount > 1) {
        timer = setTimeout(() => setBreathCount((c) => c - 1), 1000);
      } else {
        setBreathPhase('Exhale');
        setBreathCount(6);
      }
    } else if (breathPhase === 'Exhale') {
      if (breathCount > 1) {
        timer = setTimeout(() => setBreathCount((c) => c - 1), 1000);
      } else {
        setBreathPhase('Inhale');
        setBreathCount(4);
      }
    }

    return () => clearTimeout(timer);
  }, [isBreathing, breathPhase, breathCount]);

  const handleInlinePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    const res = verifyAndUnlockPin(pinInput);
    if (res.success) {
      setPinFeedback({
        type: 'success',
        message: `PIN ${pinInput.toUpperCase()} activated! ${res.pin?.assignedVideoIds.length || 0} clinical exercises unlocked.`
      });
      setPinInput('');
    } else {
      setPinFeedback({
        type: 'error',
        message: res.message
      });
    }
  };

  const handleSaveThoughtRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSituation.trim() || !newThought.trim() || !newRational.trim()) return;

    const newRecord: ThoughtRecord = {
      id: `cbt-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      situation: newSituation.trim(),
      negativeThought: newThought.trim(),
      distortion: newDistortion,
      emotion: newEmotion,
      intensity: newIntensity,
      rationalResponse: newRational.trim(),
      newIntensity: newReRated
    };

    setRecords([newRecord, ...records]);
    setNewSituation('');
    setNewThought('');
    setNewRational('');
    setCbtSuccess(true);
    setTimeout(() => setCbtSuccess(false), 3000);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const myAppointments = appointments.filter(
    (apt) => apt.patientId === currentUser?.id || apt.patientName === currentUser?.name
  );

  const prescribedVideos = interventions.filter((v) =>
    unlockedVideoIds.includes(v.id)
  );

  const filteredPrescribedVideos = prescribedVideos.filter((v) => {
    const matchFilter = videoFilter === 'all' || v.category.toLowerCase().includes(videoFilter.toLowerCase());
    const matchSearch = videoSearch === '' ||
      v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
      v.description.toLowerCase().includes(videoSearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Patient Profile Header Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl -z-10 transform translate-x-32 -translate-y-32"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-neutral-950 text-white font-serif text-3xl font-bold flex items-center justify-center shrink-0 shadow-md">
              {currentUser?.name?.charAt(0) || 'P'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold ${
                    isAdmin
                      ? 'bg-neutral-900 text-white'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}
                >
                  {isAdmin ? 'Doctor View (Patient Portal Preview)' : 'Verified Patient Profile'}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  ID: {currentUser?.id?.slice(0, 10) || 'PAT-101'}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
                Welcome back, {currentUser?.name || 'Patient'}
              </h1>
              <p className="text-xs text-neutral-600 font-sans mt-0.5">
                Reality Mind Clinic · Tak Mohalla Road, Bijbehara · Supervised by Dr. Malik Sayar
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {isAdmin ? (
              <Link
                to="/admin"
                className="bg-neutral-950 text-white px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 flex items-center gap-2 shadow-xs transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Open Doctor / Admin Portal</span>
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="bg-neutral-950 text-white px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 flex items-center gap-2 shadow-xs transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPinModalOpen(true)}
                  className="border border-neutral-300 hover:border-black text-neutral-900 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Redeem Doctor PIN</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Clinical Statistics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-neutral-100">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block font-semibold">
              Prescribed Interventions
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-neutral-950 font-serif">
                {prescribedVideos.length}
              </span>
              <span className="text-xs text-emerald-700 font-medium">unlocked</span>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block font-semibold">
              My Appointments
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-neutral-950 font-serif">
                {myAppointments.length}
              </span>
              <span className="text-xs text-neutral-500 font-medium">scheduled</span>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block font-semibold">
              CBT Thought Logs
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-neutral-950 font-serif">
                {records.length}
              </span>
              <span className="text-xs text-neutral-500 font-medium">entries</span>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block font-semibold">
              Active Prescription PIN
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-sm font-bold text-neutral-900 font-mono">
                {activeUnlockedPin ? activeUnlockedPin.code : 'None'}
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">
                {activeUnlockedPin ? '✓ Active' : 'Enter PIN'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Patient Navigation Tabs */}
      <div className="flex border-b border-neutral-200 overflow-x-auto gap-2 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('prescriptions')}
          className={`pb-3 pt-1 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'prescriptions'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>My Prescribed Interventions ({prescribedVideos.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tools')}
          className={`pb-3 pt-1 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'tools'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Wind className="w-3.5 h-3.5" />
          <span>Daily Self-Regulation Toolkit</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cbt-log')}
          className={`pb-3 pt-1 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'cbt-log'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>CBT Thought Record ({records.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 pt-1 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'appointments'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>My Consultations ({myAppointments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('doctor')}
          className={`pb-3 pt-1 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'doctor'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>My Doctor & Clinic Help</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* TAB 1: PRESCRIBED INTERVENTIONS */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-6">
          {/* In-line PIN Unlock Card */}
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  Clinical PIN Prescription Portal
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Have an Access PIN from Dr. Malik Sayar?
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Enter your unique clinical access code to instantly unlock therapeutic guided interventions, breathing exercises, and homework materials assigned during your consultation.
              </p>
            </div>

            <form onSubmit={handleInlinePinSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 shrink-0">
              <input
                type="text"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.toUpperCase())}
                placeholder="e.g. RMC-2026"
                className="bg-neutral-800/90 border border-neutral-700 text-white placeholder-neutral-500 px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider focus:outline-hidden focus:border-white uppercase"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-neutral-950 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-xs"
              >
                Unlock Sessions
              </button>
            </form>
          </div>

          {pinFeedback && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                pinFeedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {pinFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{pinFeedback.message}</span>
              </div>
              <button
                type="button"
                onClick={() => setPinFeedback(null)}
                className="text-[11px] font-bold underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-neutral-200">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={videoSearch}
                onChange={(e) => setVideoSearch(e.target.value)}
                placeholder="Search unlocked exercises..."
                className="w-full pl-9 pr-3 py-1.5 border border-neutral-200 rounded-lg text-xs focus:outline-hidden focus:border-black"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {['all', 'mindfulness', 'cbt', 'relaxation'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setVideoFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap ${
                    videoFilter === cat
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Prescribed Videos Grid */}
          {filteredPrescribedVideos.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-neutral-900">
                  {prescribedVideos.length === 0
                    ? 'No Clinical Interventions Unlocked Yet'
                    : 'No Interventions Match Your Search'}
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  {prescribedVideos.length === 0
                    ? 'Enter the PIN code issued by Dr. Malik Sayar during your consultation to unlock your personalized Category A therapeutic interventions.'
                    : 'Try adjusting your category filter or search keywords.'}
                </p>
              </div>
              {prescribedVideos.length === 0 && (
                <button
                  type="button"
                  onClick={() => setPinModalOpen(true)}
                  className="px-6 py-2.5 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 shadow-xs"
                >
                  Enter PIN Code
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrescribedVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <span className="absolute top-2.5 right-2.5 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Unlock className="w-2.5 h-2.5" />
                        <span>Prescribed</span>
                      </span>
                      <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white bg-black/75 px-2 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase">
                        <span>{video.category}</span>
                        {video.type && <span className="font-bold text-neutral-800">{video.type}</span>}
                      </div>

                      <h4 className="font-serif text-lg font-bold text-neutral-950 line-clamp-1 group-hover:text-emerald-800 transition-colors">
                        {video.title}
                      </h4>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>

                      {video.clinicalRationale && (
                        <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-100 text-[11px] text-neutral-600 space-y-0.5">
                          <strong className="text-neutral-900 font-semibold block text-[10px] uppercase font-mono">
                            Clinical Rationale:
                          </strong>
                          <p className="line-clamp-2 italic">{video.clinicalRationale}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Launch button */}
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className="w-full py-2.5 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Practice Session</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DAILY SELF-REGULATION TOOLKIT */}
      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Breathing Regulation Pacer */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  Somatic Downregulation
                </span>
                <h3 className="font-serif text-2xl font-bold text-neutral-950 mt-1">
                  Guided Diaphragmatic Breath Pacer
                </h3>
                <p className="text-xs text-neutral-500">
                  Paced rhythmic abdominal breathing to stimulate the vagus nerve and reduce acute panic surges.
                </p>
              </div>
            </div>

            {/* Visual Animated Breathing Ring */}
            <div className="py-10 flex flex-col items-center justify-center">
              <div
                className={`w-52 h-52 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 ${
                  !isBreathing
                    ? 'border-neutral-200 bg-neutral-50'
                    : breathPhase === 'Inhale'
                    ? 'border-emerald-500 bg-emerald-50 scale-110 shadow-lg shadow-emerald-100'
                    : breathPhase === 'Hold'
                    ? 'border-amber-400 bg-amber-50 scale-110'
                    : 'border-blue-500 bg-blue-50 scale-95'
                }`}
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                  {isBreathing ? breathPhase : 'Ready'}
                </span>
                <span className="text-5xl font-serif font-bold text-neutral-950 my-1">
                  {isBreathing ? breathCount : '4-4-6'}
                </span>
                <span className="text-[10px] text-neutral-600 font-sans">
                  {isBreathing
                    ? breathPhase === 'Inhale'
                      ? 'Deep into belly'
                      : breathPhase === 'Hold'
                      ? 'Gentle pause'
                      : 'Slow smooth exhale'
                    : 'Paced Rhythm'}
                </span>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsBreathing(!isBreathing);
                    setBreathPhase('Inhale');
                    setBreathCount(4);
                  }}
                  className={`px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-xs transition-all ${
                    isBreathing
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-neutral-950 text-white hover:bg-neutral-800'
                  }`}
                >
                  {isBreathing ? 'Stop Exercise' : 'Begin Paced Breathing'}
                </button>
              </div>
            </div>

            {/* Clinical Instructions */}
            <div className="bg-neutral-50 border border-neutral-100 p-4 rounded-xl text-xs text-neutral-700 space-y-1.5">
              <h5 className="font-bold text-neutral-900 font-serif text-sm">How to Practice:</h5>
              <p>1. Rest one hand on your chest and one on your abdomen.</p>
              <p>2. Inhale through the nose for 4 seconds, feeling your belly expand.</p>
              <p>3. Hold gently for 4 seconds without clenching your throat.</p>
              <p>4. Exhale smoothly through pursed lips for 6 seconds.</p>
            </div>
          </div>

          {/* Right Column: Grounding & Emergency Hotlines */}
          <div className="lg:col-span-5 space-y-6">
            {/* 5-4-3-2-1 Grounding Checklist */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-neutral-800" />
                <h4 className="font-serif text-lg font-bold text-neutral-950">
                  5-4-3-2-1 Sensory Grounding
                </h4>
              </div>
              <p className="text-xs text-neutral-500">
                Deploy when dissociation, mental fog, or racing catastrophic thoughts spike.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-neutral-50 rounded-lg flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    5
                  </span>
                  <span><strong>Look:</strong> Identify 5 distinct things you see around you right now.</span>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <span><strong>Touch:</strong> Notice 4 physical textures (chair back, phone screen, jeans).</span>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span><strong>Listen:</strong> Listen for 3 ambient sounds (fan, street noise, footsteps).</span>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span><strong>Smell:</strong> Notice 2 aromas nearby or smell your sleeve or coffee.</span>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span><strong>Taste:</strong> Take a mindful sip of water or notice the taste in your mouth.</span>
                </div>
              </div>
            </div>

            {/* Crisis SOS Support Card */}
            <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6 space-y-3 text-red-950">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <h4 className="font-serif text-lg font-bold">24/7 Clinical & Crisis Support</h4>
              </div>
              <p className="text-xs text-red-900/80 leading-relaxed">
                If you are experiencing acute unmanageable distress or panic, reach out immediately:
              </p>

              <div className="space-y-2 pt-1 text-xs">
                <a
                  href="tel:14416"
                  className="flex items-center justify-between p-2.5 bg-white border border-red-200 rounded-lg font-semibold hover:border-red-400 transition-colors"
                >
                  <span>Tele-MANAS Mental Health Helpline</span>
                  <span className="font-mono text-red-700">14416 (Toll-Free)</span>
                </a>
                <a
                  href="tel:6005754205"
                  className="flex items-center justify-between p-2.5 bg-white border border-red-200 rounded-lg font-semibold hover:border-red-400 transition-colors"
                >
                  <span>Clinic Direct Helpline (Bijbehara)</span>
                  <span className="font-mono text-neutral-900">+91 6005754205</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CBT THOUGHT RECORD & DAILY DIARY */}
      {activeTab === 'cbt-log' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Add New Thought Record */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded font-bold">
                Cognitive Restructuring
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-950 mt-1">
                New CBT Thought Record
              </h3>
              <p className="text-xs text-neutral-500">
                Log distressing situations to catch automatic negative thoughts and build balanced perspectives.
              </p>
            </div>

            {cbtSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thought record saved to your journal!</span>
              </div>
            )}

            <form onSubmit={handleSaveThoughtRecord} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                  1. Triggering Situation / Event *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newSituation}
                  onChange={(e) => setNewSituation(e.target.value)}
                  placeholder="What happened? Who was there? Where were you?"
                  className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                  2. Automatic Negative Thought (ANT) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newThought}
                  onChange={(e) => setNewThought(e.target.value)}
                  placeholder="What went through your mind? (e.g. 'I will fail', 'Everyone will judge me')"
                  className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                    Cognitive Distortion
                  </label>
                  <select
                    value={newDistortion}
                    onChange={(e) => setNewDistortion(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-black text-xs"
                  >
                    <option value="Catastrophizing">Catastrophizing</option>
                    <option value="All-or-Nothing Thinking">All-or-Nothing</option>
                    <option value="Mind Reading">Mind Reading</option>
                    <option value="Fortune Telling">Fortune Telling</option>
                    <option value="Emotional Reasoning">Emotional Reasoning</option>
                    <option value="Overgeneralization">Overgeneralization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                    Distress Level (1-10): {newIntensity}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={newIntensity}
                    onChange={(e) => setNewIntensity(Number(e.target.value))}
                    className="w-full mt-2 accent-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                  3. Balanced / Rational Alternative Perspective *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newRational}
                  onChange={(e) => setNewRational(e.target.value)}
                  placeholder="What is the objective evidence? What would you tell a friend?"
                  className="w-full p-2.5 border border-neutral-300 rounded-lg focus:outline-hidden focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-neutral-700 mb-1">
                  Re-rated Distress Level (1-10): {newReRated}
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={newReRated}
                  onChange={(e) => setNewReRated(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 shadow-xs"
              >
                Save to Clinical Journal
              </button>
            </form>
          </div>

          {/* Right Column: History of Logged Records */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-xl font-bold text-neutral-950">
                My Clinical Journal Entries ({records.length})
              </h4>
              <span className="text-xs text-neutral-500">
                Discuss these in your next consultation with Dr. Malik
              </span>
            </div>

            {records.length === 0 ? (
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center text-xs text-neutral-500 space-y-2">
                <BookOpen className="w-8 h-8 mx-auto text-neutral-400" />
                <p>No thought records saved yet. Complete your first exercise on the left.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {records.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded font-bold">
                          {r.date}
                        </span>
                        <span className="text-[10px] font-mono text-purple-800 bg-purple-50 px-2 py-0.5 rounded font-semibold">
                          {r.distortion}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-medium text-neutral-600">
                          Distress: <strong className="text-red-700">{r.intensity}/10</strong> ➔{' '}
                          <strong className="text-emerald-700">{r.newIntensity}/10</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteRecord(r.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-neutral-500">
                        <strong className="text-neutral-900">Trigger:</strong> {r.situation}
                      </p>
                      <p className="text-neutral-800 bg-red-50/50 p-2 rounded-lg border border-red-100">
                        <strong className="text-red-900">Automatic Thought:</strong> "{r.negativeThought}"
                      </p>
                      <p className="text-neutral-900 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                        <strong className="text-emerald-900">Rational Reframe:</strong> {r.rationalResponse}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: MY APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-serif text-2xl font-bold text-neutral-950">
                Scheduled Appointments ({myAppointments.length})
              </h3>
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="bg-neutral-950 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 shadow-xs"
              >
                + Book New Session
              </button>
            </div>

            {myAppointments.length === 0 ? (
              <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center space-y-3">
                <Calendar className="w-10 h-10 mx-auto text-neutral-400" />
                <h4 className="font-serif text-lg font-bold text-neutral-900">No Appointments on Record</h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  You do not have any upcoming clinical sessions scheduled right now. Click below to book an in-clinic or online consultation.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="px-5 py-2.5 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800"
                >
                  Book Consultation Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {apt.status}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">ID: {apt.id}</span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-neutral-950">{apt.service}</h4>
                      <p className="text-xs text-neutral-600">
                        Focus Area: <strong>{apt.treatmentArea}</strong>
                      </p>
                      <p className="text-xs text-neutral-500">
                        📅 <strong>{apt.date}</strong> at {apt.timeSlot} ·{' '}
                        {apt.type === 'offline' ? 'In-Clinic at Tak Mohalla Rd, Bijbehara' : 'Online Video Session'}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                      <a
                        href="https://wa.me/916005754205"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Confirm on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-5">
            <div className="bg-neutral-900 text-white rounded-2xl p-6 space-y-4 shadow-md">
              <h4 className="font-serif text-lg font-bold">Clinic Visit Checklist</h4>
              <ul className="space-y-2 text-xs text-neutral-300 list-disc pl-4 leading-relaxed">
                <li>Arrive 10 minutes prior to your scheduled slot at Tak Mohalla Road, Bijbehara.</li>
                <li>Bring any prior medical notes or prescriptions if this is your first evaluation.</li>
                <li>Ensure you have completed your CBT thought records for discussion.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MY DOCTOR & CLINIC HELP */}
      {activeTab === 'doctor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-neutral-200 rounded-2xl p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-950 text-white font-serif text-2xl font-bold flex items-center justify-center shrink-0">
                MS
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded font-bold">
                  Clinical Lead & Psychologist
                </span>
                <h3 className="font-serif text-2xl font-bold text-neutral-950 mt-1">
                  Dr. Malik Sayar
                </h3>
                <p className="text-xs text-neutral-500">
                  Consultant Psychologist & Clinical Hypnotherapist
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed pt-2 border-t border-neutral-100">
              Dr. Malik Sayar oversees all patient therapy programs, clinical intervention assignments, and psychological consultations at Reality Mind Clinic, focusing on evidence-based CBT, Hypnotherapy, and emotional wellbeing.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">Clinic Location:</span>
                <strong className="text-neutral-900">Tak Mohalla Road, Bijbehara</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">Direct Consultation Phone:</span>
                <strong className="text-neutral-900 font-mono">+91 6005754205</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">Hours:</span>
                <strong className="text-neutral-900">Mon - Sat: 10:00 AM - 6:00 PM</strong>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href="https://wa.me/916005754205"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Message</span>
              </a>
              <a
                href="tel:6005754205"
                className="flex-1 py-2.5 border border-neutral-300 text-neutral-900 rounded-lg text-xs font-semibold uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-7 shadow-xs space-y-4">
            <h4 className="font-serif text-xl font-bold text-neutral-950">
              Home Practice & Clinical Compliance
            </h4>
            <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
              <p>
                Therapy outcomes depend significantly on structured daily engagement between sessions. Your assigned interventions are tailored to your psychological assessment.
              </p>
              <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-xl space-y-1">
                <strong className="text-neutral-900 font-semibold block">Need a PIN Code?</strong>
                <p className="text-neutral-500">
                  If you need new videos or your previous PIN has expired, contact Dr. Malik or request an updated prescription code during your consultation.
                </p>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-xl space-y-1">
                <strong className="text-neutral-900 font-semibold block">Confidentiality Guarantee</strong>
                <p className="text-neutral-500">
                  Your identity, clinical assessments, journal entries, and consultation notes are strictly protected under clinical ethical guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
