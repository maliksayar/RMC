import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Activity,
  Heart,
  Eye,
  Check,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InterventionVideo } from '../types';

export const InterventionPlayerModal: React.FC = () => {
  const { activeVideo, setActiveVideo, activeUnlockedPin } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'steps' | 'interactive'>('interactive');

  // Breathing pacer state
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [breathsCount, setBreathsCount] = useState(0);

  // 5-4-3-2-1 state
  const [checkedGrounding, setCheckedGrounding] = useState<Record<number, boolean>>({});

  // CBT Record state
  const [cbtThought, setCbtThought] = useState({
    situation: '',
    automaticThought: '',
    cognitiveDistortion: 'Catastrophizing',
    balancedThought: ''
  });
  const [cbtSaved, setCbtSaved] = useState(false);

  // PMR Step
  const [pmrStep, setPmrStep] = useState(0);

  useEffect(() => {
    let interval: any;
    if (activeVideo?.interactiveType === 'breathing') {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev > 1) return prev - 1;

          // Transition cycle: Inhale (4s) -> Hold (4s) -> Exhale (6s)
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 4;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 6;
          } else {
            setBreathPhase('Inhale');
            setBreathsCount((c) => c + 1);
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeVideo, breathPhase]);

  if (!activeVideo) return null;

  const toggleGrounding = (idx: number) => {
    setCheckedGrounding((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const pmrMuscleGroups = [
    { name: 'Feet & Toes', instruction: 'Curl toes downward into the soles. Squeeze for 5 seconds, then let go completely.' },
    { name: 'Calves & Lower Legs', instruction: 'Point toes upward towards your knees. Feel the tension in calves, then exhale and release.' },
    { name: 'Thighs & Quads', instruction: 'Tense upper thigh muscles pressing knees down. Hold for 5 seconds, release smoothly.' },
    { name: 'Abdomen & Core', instruction: 'Tighten stomach muscles as if preparing for a ball to land on it. Hold, then soften.' },
    { name: 'Shoulders & Neck', instruction: 'Hunch shoulders up toward your ears. Hold the tightness, then drop them heavily down.' },
    { name: 'Jaw & Facial Muscles', instruction: 'Clench teeth gently and wrinkle forehead. Hold for 4 seconds, then let your jaw go slack.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-neutral-300 w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden relative max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between shrink-0 bg-neutral-900 text-white">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                  {activeVideo.category}
                </span>
                <span className="text-[10px] text-neutral-400">
                  Target: {activeVideo.typicallyAssignedFor}
                </span>
              </div>
              <h3 className="font-garamond text-xl sm:text-2xl font-bold text-white mt-0.5">
                {activeVideo.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            className="text-neutral-400 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 px-4 shrink-0 text-xs font-semibold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab('interactive')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'interactive'
                ? 'border-black text-black bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Guided Session</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'video'
                ? 'border-black text-black bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Therapist Video / Audio ({activeVideo.duration})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('steps')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'steps'
                ? 'border-black text-black bg-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Clinical Protocol & Steps</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* TAB 1: INTERACTIVE GUIDED TOOL */}
          {activeTab === 'interactive' && (
            <div className="space-y-6">
              {/* Diaphragmatic Breathing Pacer */}
              {activeVideo.interactiveType === 'breathing' && (
                <div className="bg-neutral-900 text-white p-8 rounded-xl text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
                  <div className="absolute top-4 left-4 text-xs font-mono text-neutral-400">
                    Resonant Vagal Pacing: 4s Inhale · 4s Hold · 6s Exhale
                  </div>
                  <div className="absolute top-4 right-4 text-xs font-mono text-neutral-300">
                    Cycles Completed: <span className="text-emerald-400 font-bold">{breathsCount}</span>
                  </div>

                  {/* Pulsing Visual Sphere */}
                  <div className="relative my-8 flex items-center justify-center">
                    <div
                      className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-neutral-700 flex flex-col items-center justify-center transition-all duration-1000 ${
                        breathPhase === 'Inhale'
                          ? 'scale-125 bg-emerald-500/20 border-emerald-400/50 shadow-lg shadow-emerald-500/10'
                          : breathPhase === 'Hold'
                          ? 'scale-125 bg-neutral-800/80 border-neutral-500'
                          : 'scale-90 bg-neutral-950 border-neutral-800'
                      }`}
                    >
                      <span className="font-garamond text-2xl sm:text-3xl font-bold tracking-wider">
                        {breathPhase}
                      </span>
                      <span className="font-mono text-3xl font-extrabold text-neutral-200 mt-1">
                        {breathTimer}s
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    {breathPhase === 'Inhale' && 'Slowly expand your belly outward as you inhale deeply through the nose.'}
                    {breathPhase === 'Hold' && 'Keep shoulders soft and jaw relaxed while holding the breath.'}
                    {breathPhase === 'Exhale' && 'Gently release the breath through pursed lips, emptying lungs completely.'}
                  </p>
                </div>
              )}

              {/* 5-4-3-2-1 Sensory Grounding Tool */}
              {activeVideo.interactiveType === 'grounding' && (
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-100 border border-neutral-200 rounded">
                    <h4 className="font-garamond text-lg font-bold text-neutral-900">
                      5-4-3-2-1 Sensory Panic Reset
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      Check each anchor item as you locate it in your physical environment. This forces the nervous system to shift from threat scanning into present reality.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { num: 5, sense: 'SEE', prompt: '5 things you can visually observe in your immediate room' },
                      { num: 4, sense: 'TOUCH', prompt: '4 physical textures you can touch (clothing, chair fabric, tabletop)' },
                      { num: 3, sense: 'HEAR', prompt: '3 distinct sounds you can detect right now (clock tick, fan, distant traffic)' },
                      { num: 2, sense: 'SMELL', prompt: '2 aromas you can perceive or fresh air you can inhale' },
                      { num: 1, sense: 'TASTE', prompt: '1 taste sensation or taking a slow sip of room-temperature water' }
                    ].map((item, idx) => (
                      <div
                        key={item.num}
                        onClick={() => toggleGrounding(idx)}
                        className={`p-3.5 rounded border transition-all cursor-pointer flex items-center justify-between ${
                          checkedGrounding[idx]
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-black'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center font-mono ${
                              checkedGrounding[idx] ? 'bg-white text-black' : 'bg-neutral-100 text-neutral-900'
                            }`}
                          >
                            {item.num}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                              {item.sense}
                            </span>
                            <p className="text-xs font-medium">{item.prompt}</p>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            checkedGrounding[idx] ? 'border-white bg-white text-black' : 'border-neutral-300'
                          }`}
                        >
                          {checkedGrounding[idx] && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progressive Muscle Relaxation (PMR) Tool */}
              {activeVideo.interactiveType === 'pmr' && (
                <div className="space-y-4">
                  <div className="bg-neutral-900 text-white p-6 rounded-lg text-center">
                    <span className="text-xs uppercase font-mono text-neutral-400">
                      Muscle Group {pmrStep + 1} of {pmrMuscleGroups.length}
                    </span>
                    <h4 className="font-garamond text-2xl font-bold mt-1 text-white">
                      {pmrMuscleGroups[pmrStep].name}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-lg mx-auto leading-relaxed">
                      {pmrMuscleGroups[pmrStep].instruction}
                    </p>

                    <div className="flex items-center justify-center gap-3 mt-6">
                      <button
                        type="button"
                        disabled={pmrStep === 0}
                        onClick={() => setPmrStep((s) => Math.max(0, s - 1))}
                        className="px-4 py-2 border border-neutral-700 text-xs rounded uppercase font-semibold disabled:opacity-30"
                      >
                        Previous Group
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPmrStep((s) => (s + 1 < pmrMuscleGroups.length ? s + 1 : 0))
                        }
                        className="px-5 py-2 bg-white text-black text-xs rounded uppercase font-semibold hover:bg-neutral-200"
                      >
                        {pmrStep + 1 === pmrMuscleGroups.length ? 'Restart Sequence' : 'Next Group'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CBT Thought Record Interactive Tool */}
              {(activeVideo.interactiveType === 'cbt-record' || !activeVideo.interactiveType) && (
                <div className="bg-white border border-neutral-200 rounded-lg p-5 space-y-4">
                  <div className="border-b border-neutral-100 pb-3">
                    <h4 className="font-garamond text-xl font-bold text-neutral-900">
                      Interactive Cognitive Restructuring Worksheet
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Work through an upsetting thought right now using the 4-step CBT thought disputation method.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        1. Triggering Situation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Received an ambiguous message from supervisor..."
                        value={cbtThought.situation}
                        onChange={(e) => setCbtThought({ ...cbtThought, situation: e.target.value })}
                        className="w-full p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        2. Automatic Negative Thought (ANT)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 'I am going to get fired and everything is ruined.'"
                        value={cbtThought.automaticThought}
                        onChange={(e) => setCbtThought({ ...cbtThought, automaticThought: e.target.value })}
                        className="w-full p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          3. Identified Cognitive Distortion
                        </label>
                        <select
                          value={cbtThought.cognitiveDistortion}
                          onChange={(e) => setCbtThought({ ...cbtThought, cognitiveDistortion: e.target.value })}
                          className="w-full p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden bg-white"
                        >
                          <option value="Catastrophizing">Catastrophizing (Expecting worst case)</option>
                          <option value="Mind Reading">Mind Reading (Assuming what others think)</option>
                          <option value="All-or-Nothing">All-or-Nothing (Black-and-white thinking)</option>
                          <option value="Overgeneralization">Overgeneralization</option>
                          <option value="Emotional Reasoning">Emotional Reasoning ("I feel it, so it's true")</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                          4. Evidence-Based Adaptive Replacement
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 'I have handled tough conversations before; let me wait for facts.'"
                          value={cbtThought.balancedThought}
                          onChange={(e) => setCbtThought({ ...cbtThought, balancedThought: e.target.value })}
                          className="w-full p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-[11px] text-neutral-500">
                        Worksheet will be reviewed during your next clinical follow-up.
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setCbtSaved(true);
                          setTimeout(() => setCbtSaved(false), 3000);
                        }}
                        className="bg-black text-white px-4 py-2 rounded uppercase tracking-wider font-semibold text-xs hover:bg-neutral-800"
                      >
                        {cbtSaved ? 'Saved to Patient File ✓' : 'Save Worksheet'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VIDEO / AUDIO PLAYER SIMULATION */}
          {activeTab === 'video' && (
            <div className="space-y-4">
              <div className="relative aspect-video bg-neutral-950 rounded-lg overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                {/* Background image / video poster */}
                <img
                  src={activeVideo.thumbnailUrl}
                  alt={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />

                {/* Cloudinary Authenticated Signed Link watermark */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-neutral-300 bg-black/70 backdrop-blur-xs px-3 py-1.5 rounded border border-white/10">
                  <div className="flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cloudinary Private Stream · Signed Expiring Token</span>
                  </div>
                  <span className="font-mono text-neutral-400">
                    PIN: {activeUnlockedPin ? activeUnlockedPin.code : 'RMC-AUTH'}
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="relative z-10 my-auto text-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto hover:scale-105 transition-transform shadow-xl"
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </button>
                  <p className="text-white text-xs font-semibold mt-3 tracking-wide drop-shadow-md">
                    {isPlaying ? 'Session Streaming (Encrypted)' : 'Click to Play Guidance'}
                  </p>
                </div>

                {/* Player Bottom Bar */}
                <div className="relative z-10 bg-black/80 backdrop-blur-xs p-3 rounded border border-white/10 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-neutral-700 h-1.5 rounded-full overflow-hidden cursor-pointer">
                      <div
                        className="bg-white h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-300 shrink-0">
                      04:12 / {activeVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-300 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-white"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setProgress(0)}
                        className="hover:text-white"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-white"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    <span className="text-[11px] text-neutral-400">
                      Reality Mind Clinic Audio-Visual Production
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded text-xs space-y-2">
                <h5 className="font-bold uppercase tracking-wider text-neutral-900">
                  Therapeutic Description & Purpose
                </h5>
                <p className="text-neutral-700 leading-relaxed">{activeVideo.description}</p>
                <div className="pt-1 text-[11px] text-neutral-500">
                  <span className="font-semibold text-neutral-800">Clinical Rationale:</span> {activeVideo.clinicalRationale}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLINICAL PROTOCOL & STEPS */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <div className="border border-neutral-200 rounded-lg p-5 bg-white space-y-4">
                <h4 className="font-garamond text-xl font-bold text-neutral-950">
                  Prescribed Clinical Steps for Practice
                </h4>
                <p className="text-xs text-neutral-600">
                  Follow this exact step sequence prescribed by your psychologist. Practice daily for 14 consecutive days to cement neuroplastic conditioning.
                </p>

                <div className="space-y-3 pt-2">
                  {activeVideo.keySteps?.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-neutral-50 border border-neutral-200 rounded flex items-start gap-3 text-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="font-medium text-neutral-900 leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-100 p-4 rounded text-xs text-neutral-700 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <span>
                  Consultation continuity note: Please record any bodily sensations or cognitive resistance in your personal journal before your next appointment at Tak Mohalla Road, Bijbehara.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-600 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="text-[11px]">Reality Mind Clinic Private Video Vault</span>
          </div>

          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            className="bg-black text-white px-4 py-2 rounded uppercase tracking-wider font-semibold text-xs hover:bg-neutral-800 transition-colors"
          >
            Close Session
          </button>
        </div>
      </div>
    </div>
  );
};
