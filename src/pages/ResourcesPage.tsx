import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Play,
  Filter,
  CheckCircle,
  ShieldCheck,
  Activity,
  Layers,
  Search,
  Sparkles,
  Info,
  Plus,
  Trash2,
  BookOpen,
  Video,
  Clock,
  Compass,
  HelpCircle,
  Eye,
  AlertCircle,
  Check,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InterventionVideo, ResourceKind, TreatmentArea } from '../types';

export const ResourcesPage: React.FC = () => {
  const {
    interventions,
    unlockedVideoIds,
    activeUnlockedPin,
    setPinModalOpen,
    setActiveVideo,
    addIntervention,
    deleteIntervention,
    role,
    switchRole
  } = useApp();

  // Active resource filter tab: 'all' | 'interventions' | 'educational'
  const [activeTab, setActiveTab] = useState<'all' | 'interventions' | 'educational'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('All');

  // Admin dynamic upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalResourceKind, setModalResourceKind] = useState<ResourceKind>('educational');
  const [modalIsRestricted, setModalIsRestricted] = useState(false);
  const [modalCategory, setModalCategory] = useState('Psychoeducation');
  const [modalTreatmentArea, setModalTreatmentArea] = useState<TreatmentArea>('Anxiety');
  const [modalDuration, setModalDuration] = useState('6 mins');
  const [modalVideoUrl, setModalVideoUrl] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalWhatItIs, setModalWhatItIs] = useState('');
  const [modalWhyUsed, setModalWhyUsed] = useState('');
  const [modalHowToPerform, setModalHowToPerform] = useState('');
  const [modalMistakes, setModalMistakes] = useState('');
  const [modalWhenToPractise, setModalWhenToPractise] = useState('');

  // Expanded details for Category A cards
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  // Filter videos
  const filteredVideos = interventions.filter((v) => {
    // Kind filter
    if (activeTab === 'interventions' && v.resourceKind === 'educational') return false;
    if (activeTab === 'educational' && v.resourceKind !== 'educational') return false;

    // Treatment area filter
    if (selectedArea !== 'All' && v.treatmentArea !== selectedArea) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = v.title.toLowerCase().includes(q);
      const matchDesc = v.description.toLowerCase().includes(q);
      const matchCat = v.category.toLowerCase().includes(q);
      const matchFor = v.typicallyAssignedFor?.toLowerCase().includes(q) || false;
      return matchTitle || matchDesc || matchCat || matchFor;
    }

    return true;
  });

  const interventionVideos = filteredVideos.filter((v) => v.resourceKind !== 'educational');
  const educationalVideos = filteredVideos.filter((v) => v.resourceKind === 'educational');

  const handleAdminUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim()) {
      alert('Please provide a video title.');
      return;
    }

    // Default stock medical thumbnail
    const defaultThumbnail =
      modalResourceKind === 'educational'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80';

    addIntervention({
      title: modalTitle.trim(),
      resourceKind: modalResourceKind,
      isRestricted: modalResourceKind === 'educational' ? false : modalIsRestricted,
      category: modalCategory,
      treatmentArea: modalTreatmentArea,
      duration: modalDuration || '8 mins',
      videoUrl: modalVideoUrl || undefined,
      thumbnailUrl: defaultThumbnail,
      description: modalDescription || 'Dynamic clinical resource uploaded by Reality Mind Clinic therapist.',
      whatItIs: modalWhatItIs || undefined,
      whyUsed: modalWhyUsed || undefined,
      howToPerform: modalHowToPerform || undefined,
      commonMistakes: modalMistakes || undefined,
      howAndWhenToPractise: modalWhenToPractise || undefined,
      type: 'video',
      typicallyAssignedFor: `${modalTreatmentArea} clinical management`
    });

    // Reset and close
    setShowUploadModal(false);
    setModalTitle('');
    setModalDescription('');
    setModalVideoUrl('');
    setModalWhatItIs('');
    setModalWhyUsed('');
    setModalHowToPerform('');
    setModalMistakes('');
    setModalWhenToPractise('');
    alert('Video successfully added to the dynamic clinic resources library!');
  };

  const isVideoUnlocked = (video: InterventionVideo) => {
    // Educational videos are always publicly accessible (Category B)
    if (video.resourceKind === 'educational') return true;
    // If explicitly non-restricted, it's public (Category A public sample)
    if (video.isRestricted === false) return true;
    // Psychologist role has master access
    if (role === 'psychologist') return true;
    // Check patient unlocked list
    return unlockedVideoIds.includes(video.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* 1. Header Banner */}
      <div className="border border-neutral-300 bg-white rounded-xl p-8 sm:p-12 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs font-semibold uppercase tracking-wider font-mono text-neutral-800">
              <BookOpen className="w-3.5 h-3.5 text-neutral-900" />
              <span>Resources — the library</span>
            </div>
            <h1 className="font-garamond text-3xl sm:text-5xl font-bold text-neutral-950">
              Resources — the library
            </h1>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
              This is a general library of your videos and educational material. It contains two distinct types of clinical content designed for psychological healing, psychoeducation, and between-session practice.
            </p>
          </div>

          {/* PIN Status & Admin Upload Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {/* PIN Unlock Status Box */}
            <div className="border border-neutral-200 bg-neutral-50/70 p-4 rounded-lg text-xs space-y-2 max-w-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
                  Prescription Access
                </span>
                {activeUnlockedPin ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle className="w-2.5 h-2.5" />
                    Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] bg-neutral-200 text-neutral-700 font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    Locked
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-600">
                {activeUnlockedPin
                  ? `Active PIN: ${activeUnlockedPin.code} (${activeUnlockedPin.patientName})`
                  : 'Enter doctor-issued PIN to unlock restricted therapeutic sessions.'}
              </p>
              <button
                type="button"
                onClick={() => setPinModalOpen(true)}
                className="w-full bg-black text-white py-2 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{activeUnlockedPin ? 'Switch Access PIN' : 'Enter Access PIN'}</span>
              </button>
            </div>

            {/* Dynamic Admin Video Upload Button */}
            <button
              type="button"
              onClick={() => {
                if (role !== 'psychologist') {
                  switchRole('psychologist');
                }
                setShowUploadModal(true);
              }}
              className="border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-neutral-900 py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-neutral-900" />
              <span>Admin: Add Video</span>
            </button>
          </div>
        </div>

        {/* Overview of Two Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
          <div
            onClick={() => setActiveTab('interventions')}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'interventions'
                ? 'border-neutral-950 bg-neutral-50'
                : 'border-neutral-200 hover:border-neutral-400 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                A
              </span>
              <h3 className="font-garamond text-lg font-bold text-neutral-950">
                Therapeutic Intervention Videos
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Longer, practical videos personally demonstrating exercises (Deep Breathing, Grounding, PMR, CBT). Can be PIN-protected or public per client recovery plan.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('educational')}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              activeTab === 'educational'
                ? 'border-neutral-950 bg-neutral-50'
                : 'border-neutral-200 hover:border-neutral-400 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                B
              </span>
              <h3 className="font-garamond text-lg font-bold text-neutral-950">
                Educational / Explanation Videos
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Short, conceptual videos explaining psychological conditions and clinical methods (What is Anxiety? What is CBT? etc.). 100% publicly accessible.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Main Content Tabs */}
          <div className="inline-flex p-1 bg-neutral-200/80 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-black shadow-xs font-bold'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              All Library ({interventions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interventions')}
              className={`px-4 py-2 rounded-md transition-all cursor-pointer ${
                activeTab === 'interventions'
                  ? 'bg-white text-black shadow-xs font-bold'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              A. Guided Interventions ({interventions.filter((v) => v.resourceKind !== 'educational').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('educational')}
              className={`px-4 py-2 rounded-md transition-all cursor-pointer ${
                activeTab === 'educational'
                  ? 'bg-white text-black shadow-xs font-bold'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              B. Educational Videos ({interventions.filter((v) => v.resourceKind === 'educational').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search library resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 border border-neutral-300 rounded-md focus:outline-hidden focus:border-black bg-white"
            />
          </div>
        </div>
      </div>

      {/* 3. SECTION A: THERAPEUTIC INTERVENTION VIDEOS (When All or Interventions tab active) */}
      {(activeTab === 'all' || activeTab === 'interventions') && (
        <section className="space-y-6">
          <div className="border-b border-neutral-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                A
              </span>
              <div>
                <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
                  Therapeutic Intervention Videos
                </h2>
                <p className="text-xs text-neutral-600">
                  Longer, practical videos. Personally demonstrated with step-by-step guidance.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              {interventionVideos.length} Practice Sessions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interventionVideos.map((video) => {
              const unlocked = isVideoUnlocked(video);
              const isDetailsExpanded = expandedDetailsId === video.id;

              return (
                <div
                  key={video.id}
                  className={`border rounded-xl overflow-hidden flex flex-col justify-between transition-all bg-white group shadow-2xs ${
                    unlocked
                      ? 'border-neutral-300 hover:border-black'
                      : 'border-neutral-200 opacity-95 hover:border-neutral-400'
                  }`}
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-video bg-neutral-950 overflow-hidden">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          unlocked
                            ? 'opacity-85 group-hover:scale-102'
                            : 'opacity-45 grayscale group-hover:grayscale-0'
                        }`}
                      />

                      {/* Access Badge */}
                      <div className="absolute top-2.5 right-2.5">
                        {video.isRestricted ? (
                          unlocked ? (
                            <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-xs">
                              <Unlock className="w-2.5 h-2.5" />
                              <span>Prescription Unlocked</span>
                            </span>
                          ) : (
                            <span className="bg-black/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-xs">
                              <Lock className="w-2.5 h-2.5" />
                              <span>PIN Protected</span>
                            </span>
                          )
                        ) : (
                          <span className="bg-neutral-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-xs">
                            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                            <span>Public Practice</span>
                          </span>
                        )}
                      </div>

                      {/* Duration & Interactive Tag */}
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-white bg-black/75 px-2 py-0.5 rounded backdrop-blur-xs">
                          {video.duration}
                        </span>
                        {video.interactiveType && (
                          <span className="text-[9px] uppercase font-bold text-white bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                            <Activity className="w-2.5 h-2.5 text-emerald-400" />
                            <span>Interactive Practice</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                        <span className="uppercase font-bold tracking-wider">{video.category}</span>
                        <span>{video.treatmentArea}</span>
                      </div>

                      <h3 className="font-garamond text-xl font-bold text-neutral-950 leading-snug">
                        {video.title}
                      </h3>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>

                      {/* Clinical Practice Framework Toggle */}
                      {video.whatItIs && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedDetailsId(isDetailsExpanded ? null : video.id)
                            }
                            className="text-[11px] font-semibold text-neutral-800 hover:text-black flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                          >
                            <span>
                              {isDetailsExpanded ? 'Hide Guidance Protocol' : 'View Practice Framework (8 Steps)'}
                            </span>
                          </button>

                          {isDetailsExpanded && (
                            <div className="mt-3 p-3.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs space-y-2 text-neutral-700 animate-in fade-in">
                              {video.whatItIs && (
                                <div>
                                  <strong className="text-neutral-950 block text-[11px]">
                                    • What the intervention is:
                                  </strong>
                                  <span className="text-[11px] leading-relaxed">{video.whatItIs}</span>
                                </div>
                              )}
                              {video.whyUsed && (
                                <div>
                                  <strong className="text-neutral-950 block text-[11px]">
                                    • Why it is being used:
                                  </strong>
                                  <span className="text-[11px] leading-relaxed">{video.whyUsed}</span>
                                </div>
                              )}
                              {video.howToPerform && (
                                <div>
                                  <strong className="text-neutral-950 block text-[11px]">
                                    • How to perform it:
                                  </strong>
                                  <span className="text-[11px] leading-relaxed">{video.howToPerform}</span>
                                </div>
                              )}
                              {video.commonMistakes && (
                                <div>
                                  <strong className="text-neutral-950 block text-[11px]">
                                    • Common mistakes:
                                  </strong>
                                  <span className="text-[11px] leading-relaxed">{video.commonMistakes}</span>
                                </div>
                              )}
                              {video.whatYouMightExperience && (
                                <div>
                                  <strong className="text-neutral-950 block text-[11px]">
                                    • What you might experience:
                                  </strong>
                                  <span className="text-[11px] leading-relaxed">{video.whatYouMightExperience}</span>
                                </div>
                              )}
                              {video.questionsDoubts && (
                                <div>
                                  <strong className="text-neutral-950 block text-[11px]">
                                    • Questions & Doubts:
                                  </strong>
                                  <span className="text-[11px] leading-relaxed">{video.questionsDoubts}</span>
                                </div>
                              )}
                              {video.howAndWhenToPractise && (
                                <div>
                                  <strong className="text-neutral-950 block text-[11px]">
                                    • How & when to practise:
                                  </strong>
                                  <span className="text-[11px] leading-relaxed">{video.howAndWhenToPractise}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-5 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (unlocked) {
                          setActiveVideo(video);
                        } else {
                          setPinModalOpen(true);
                        }
                      }}
                      className={`flex-1 py-2.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        unlocked
                          ? 'bg-black text-white hover:bg-neutral-800 shadow-xs'
                          : 'border border-neutral-300 text-neutral-800 hover:border-black hover:bg-neutral-50'
                      }`}
                    >
                      {unlocked ? (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Start Guided Practice</span>
                        </>
                      ) : (
                        <>
                          <KeyRound className="w-3.5 h-3.5" />
                          <span>Enter PIN to Unlock</span>
                        </>
                      )}
                    </button>

                    {/* Admin Delete Action */}
                    {role === 'psychologist' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Remove "${video.title}" from library?`)) {
                            deleteIntervention(video.id);
                          }
                        }}
                        className="p-2.5 border border-neutral-200 hover:border-rose-400 text-neutral-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        title="Admin: Delete Video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. SECTION B: EDUCATIONAL / EXPLANATION VIDEOS (When All or Educational tab active) */}
      {(activeTab === 'all' || activeTab === 'educational') && (
        <section className="space-y-6 pt-4">
          <div className="border-b border-neutral-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                B
              </span>
              <div>
                <h2 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950">
                  Educational / Explanation Videos
                </h2>
                <p className="text-xs text-neutral-600">
                  Short, informative videos explaining key psychological concepts. Free and publicly accessible to all.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              {educationalVideos.length} Public Videos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalVideos.map((video) => (
              <div
                key={video.id}
                className="border border-neutral-200 bg-white rounded-xl overflow-hidden flex flex-col justify-between hover:border-neutral-400 transition-all group shadow-2xs"
              >
                <div>
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-neutral-950 overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Public Badge */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-xs">
                        <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                        <span>Public Resource</span>
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="text-[10px] font-mono text-white bg-black/75 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{video.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span className="uppercase font-bold tracking-wider">{video.category}</span>
                      <span>Concept Overview</span>
                    </div>

                    <h3 className="font-garamond text-xl font-bold text-neutral-950 leading-snug">
                      {video.title}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {video.description}
                    </p>

                    {video.keySteps && video.keySteps.length > 0 && (
                      <div className="pt-2 text-[11px] text-neutral-500">
                        <span className="font-semibold text-neutral-700 block mb-1">Key Topics Covered:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-neutral-600">
                          {video.keySteps.slice(0, 3).map((step, idx) => (
                            <li key={idx} className="line-clamp-1">
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="flex-1 py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch Educational Video</span>
                  </button>

                  {role === 'psychologist' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove "${video.title}" from library?`)) {
                          deleteIntervention(video.id);
                        }
                      }}
                      className="p-2.5 border border-neutral-200 hover:border-rose-400 text-neutral-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                      title="Admin: Delete Video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. MODAL: DYNAMIC ADMIN VIDEO UPLOADER */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-neutral-300 w-full max-w-lg rounded-xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <h3 className="font-garamond text-2xl font-bold text-neutral-950">
                  Add Video to Resources Library
                </h3>
                <p className="text-xs text-neutral-500">
                  Dynamically publish therapeutic practices or educational explanations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-neutral-400 hover:text-neutral-900 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAdminUpload} className="space-y-4 text-xs font-sans">
              {/* Kind Selector */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1.5">
                  Content Kind *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalResourceKind('intervention');
                      setModalIsRestricted(true);
                      setModalCategory('Mindfulness & Relaxation');
                    }}
                    className={`py-2 px-3 rounded border text-left cursor-pointer transition-colors ${
                      modalResourceKind === 'intervention'
                        ? 'border-black bg-neutral-900 text-white font-bold'
                        : 'border-neutral-300 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    A. Therapeutic Intervention
                    <span className="block text-[10px] font-normal opacity-80">
                      Longer, guided practice
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalResourceKind('educational');
                      setModalIsRestricted(false);
                      setModalCategory('Psychoeducation');
                    }}
                    className={`py-2 px-3 rounded border text-left cursor-pointer transition-colors ${
                      modalResourceKind === 'educational'
                        ? 'border-black bg-neutral-900 text-white font-bold'
                        : 'border-neutral-300 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    B. Educational / Explanation
                    <span className="block text-[10px] font-normal opacity-80">
                      Short, public conceptual video
                    </span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    modalResourceKind === 'educational'
                      ? 'e.g. What is Social Anxiety?'
                      : 'e.g. Diaphragmatic Breathing — Complete Guided Practice'
                  }
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded text-xs bg-white"
                />
              </div>

              {/* PIN Access Restriction (for Category A) */}
              {modalResourceKind === 'intervention' && (
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded space-y-2">
                  <span className="block font-bold text-neutral-900">Access Protection</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="access"
                        checked={modalIsRestricted}
                        onChange={() => setModalIsRestricted(true)}
                      />
                      <span>PIN-Protected (Prescribed only)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="access"
                        checked={!modalIsRestricted}
                        onChange={() => setModalIsRestricted(false)}
                      />
                      <span>Publicly Accessible</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Duration & Treatment Area */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8 mins or 20 mins"
                    value={modalDuration}
                    onChange={(e) => setModalDuration(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Target Concern</label>
                  <select
                    value={modalTreatmentArea}
                    onChange={(e) => setModalTreatmentArea(e.target.value as TreatmentArea)}
                    className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                  >
                    <option value="Anxiety">Anxiety</option>
                    <option value="Depression">Depression</option>
                    <option value="OCD">OCD</option>
                    <option value="Overthinking">Overthinking</option>
                    <option value="Fear & Phobias">Fear & Phobias</option>
                    <option value="Sleep Problems">Sleep Problems</option>
                  </select>
                </div>
              </div>

              {/* Video URL */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">
                  Video URL or Embed Source (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={modalVideoUrl}
                  onChange={(e) => setModalVideoUrl(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">
                  Description / Synopsis *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Overview of this video session..."
                  value={modalDescription}
                  onChange={(e) => setModalDescription(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                />
              </div>

              {/* Category A Specific Fields */}
              {modalResourceKind === 'intervention' && (
                <div className="space-y-3 pt-2 border-t border-neutral-200">
                  <span className="font-bold text-neutral-900 block text-[11px] uppercase tracking-wider font-mono">
                    Guidance Framework Details (Optional)
                  </span>

                  <div>
                    <label className="block text-neutral-700 mb-0.5">What the intervention is:</label>
                    <input
                      type="text"
                      placeholder="e.g. Diaphragmatic pacing technique..."
                      value={modalWhatItIs}
                      onChange={(e) => setModalWhatItIs(e.target.value)}
                      className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-0.5">Why it is being used:</label>
                    <input
                      type="text"
                      placeholder="e.g. Downregulates autonomic nervous system..."
                      value={modalWhyUsed}
                      onChange={(e) => setModalWhyUsed(e.target.value)}
                      className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-0.5">How to perform it:</label>
                    <input
                      type="text"
                      placeholder="e.g. 4s inhale, 4s hold, 6s exhale..."
                      value={modalHowToPerform}
                      onChange={(e) => setModalHowToPerform(e.target.value)}
                      className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-700 mb-0.5">Common mistakes:</label>
                      <input
                        type="text"
                        placeholder="e.g. Breathing with upper chest"
                        value={modalMistakes}
                        onChange={(e) => setModalMistakes(e.target.value)}
                        className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-700 mb-0.5">When to practise:</label>
                      <input
                        type="text"
                        placeholder="e.g. Twice daily for 10 mins"
                        value={modalWhenToPractise}
                        onChange={(e) => setModalWhenToPractise(e.target.value)}
                        className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-neutral-300 rounded text-xs font-semibold hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer shadow-xs"
                >
                  Add Video to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
