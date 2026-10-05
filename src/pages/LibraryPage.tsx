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
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InterventionVideo, TreatmentArea } from '../types';

export const LibraryPage: React.FC = () => {
  const {
    interventions,
    unlockedVideoIds,
    activeUnlockedPin,
    setPinModalOpen,
    setActiveVideo
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [areaFilter, setAreaFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'CBT', 'Mindfulness & Relaxation', 'Behavioral', 'Hypnotherapy'];
  const treatmentAreas = [
    'All',
    'Anxiety',
    'Depression',
    'OCD',
    'Overthinking',
    'Fear & Phobias',
    'Sleep Problems'
  ];

  const filteredVideos = interventions.filter((v) => {
    const matchesCategory = categoryFilter === 'All' || v.category === categoryFilter;
    const matchesArea = areaFilter === 'All' || v.treatmentArea === areaFilter;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.typicallyAssignedFor?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesArea && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 font-bold">
            Section 7 · Reality Mind Clinic
          </span>
          <h1 className="font-garamond text-3xl sm:text-5xl font-bold text-neutral-950 mt-1">
            Private Video Library: Psychological Interventions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-2xl font-sans leading-relaxed">
            Each private session is named after a specific clinical intervention. Access is unlocked exclusively via the unique PIN issued by the Psychologist following a clinical consultation.
          </p>
        </div>

        {/* PIN Status Card */}
        <div className="border border-neutral-300 bg-white p-4 rounded-lg shadow-xs shrink-0 max-w-sm">
          {activeUnlockedPin ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-neutral-500 uppercase tracking-wider text-[10px]">
                  Active Prescription
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] flex items-center gap-1">
                  <CheckCircle className="w-2.5 h-2.5" />
                  Authorized
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-mono font-bold text-lg text-neutral-900">
                  PIN: {activeUnlockedPin.code}
                </span>
                <span className="text-xs text-neutral-500">
                  for {activeUnlockedPin.patientName}
                </span>
              </div>

              <p className="text-[11px] text-neutral-600">
                {activeUnlockedPin.assignedVideoIds.length} of {interventions.length} clinical sessions unlocked for your recovery regimen.
              </p>

              <button
                type="button"
                onClick={() => setPinModalOpen(true)}
                className="w-full mt-1 border border-neutral-300 hover:border-black py-1.5 rounded text-xs font-semibold text-neutral-800 transition-colors"
              >
                Switch or Enter Another PIN
              </button>
            </div>
          ) : (
            <div className="space-y-2 text-center py-1">
              <KeyRound className="w-6 h-6 text-neutral-800 mx-auto" />
              <h4 className="font-garamond text-base font-bold text-neutral-900">
                Unlock Prescribed Interventions
              </h4>
              <p className="text-[11px] text-neutral-500">
                Enter your doctor's PIN to stream your personalized guidance sessions.
              </p>
              <button
                type="button"
                onClick={() => setPinModalOpen(true)}
                className="w-full bg-black text-white py-2 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-xs"
              >
                Enter Access PIN
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cloudinary Architecture Notice */}
      <div className="p-3.5 bg-neutral-100/70 border border-neutral-200 rounded-lg text-xs text-neutral-600 flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
          <span>
            <strong className="text-neutral-900">Zero Public Exposure:</strong> Videos are served through Cloudinary authenticated private storage using signed, time-limited expiring URLs.
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
          Firestore Security Rules Verified
        </span>
      </div>

      {/* Filters & Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search interventions or symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border border-neutral-300 rounded focus:outline-hidden focus:border-black bg-white"
            />
          </div>
        </div>

        {/* Treatment Area Secondary Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-neutral-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 shrink-0">
            Target Concern:
          </span>
          {treatmentAreas.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => setAreaFilter(area)}
              className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors ${
                areaFilter === area
                  ? 'bg-neutral-200 text-neutral-900 font-semibold'
                  : 'hover:text-black hover:bg-neutral-100'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Interventions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => {
          const isUnlocked = unlockedVideoIds.includes(video.id);

          return (
            <div
              key={video.id}
              className={`border rounded-lg overflow-hidden flex flex-col justify-between transition-all bg-white group ${
                isUnlocked
                  ? 'border-neutral-300 hover:border-black hover:shadow-md'
                  : 'border-neutral-200 opacity-90 hover:opacity-100 hover:border-neutral-400'
              }`}
            >
              <div>
                {/* Media Poster */}
                <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isUnlocked
                        ? 'opacity-85 group-hover:scale-105'
                        : 'opacity-40 grayscale group-hover:grayscale-0'
                    }`}
                  />

                  {/* Status Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    {isUnlocked ? (
                      <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-xs">
                        <Unlock className="w-2.5 h-2.5" />
                        <span>Prescribed & Unlocked</span>
                      </span>
                    ) : (
                      <span className="bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Doctor PIN Required</span>
                      </span>
                    )}
                  </div>

                  {/* Format & Duration */}
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-white bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs">
                      {video.duration}
                    </span>
                    {video.interactiveType && (
                      <span className="text-[9px] uppercase font-bold text-white bg-neutral-800/80 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                        <Activity className="w-2.5 h-2.5 text-emerald-400" />
                        <span>Interactive Tool</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span className="uppercase font-bold tracking-wider">{video.category}</span>
                    <span>Session 0{index + 1}</span>
                  </div>

                  <h3 className="font-garamond text-xl font-bold text-neutral-950 leading-snug">
                    {video.title}
                  </h3>

                  <div className="p-2 bg-neutral-50 border border-neutral-100 rounded text-[11px]">
                    <span className="font-semibold text-neutral-700">Typically Assigned For:</span>{' '}
                    <span className="text-neutral-900 font-medium">{video.typicallyAssignedFor}</span>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (isUnlocked) {
                      setActiveVideo(video);
                    } else {
                      setPinModalOpen(true);
                    }
                  }}
                  className={`w-full py-2.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isUnlocked
                      ? 'bg-black text-white hover:bg-neutral-800 shadow-xs'
                      : 'border border-neutral-300 text-neutral-800 hover:border-black hover:bg-neutral-50'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Intervention</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Enter PIN to Unlock</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Table from Synopsis Page 4 */}
      <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
            Synopsis Reference Table
          </span>
          <h3 className="font-garamond text-2xl font-bold text-neutral-950">
            Full Psychological Intervention Mapping
          </h3>
          <p className="text-xs text-neutral-600">
            The starting clinical repository configured for Reality Mind Clinic.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-300 text-neutral-900 font-bold uppercase tracking-wider text-[10px] bg-neutral-50">
                <th className="py-2.5 px-3">Intervention Video</th>
                <th className="py-2.5 px-3">Typically Assigned For</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Status for You</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {interventions.map((item) => {
                const isItemUnlocked = unlockedVideoIds.includes(item.id);
                return (
                  <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-neutral-950 font-garamond text-sm">
                      {item.title}
                    </td>
                    <td className="py-3 px-3 text-neutral-700">{item.typicallyAssignedFor}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-neutral-500">
                      {item.category}
                    </td>
                    <td className="py-3 px-3">
                      {isItemUnlocked ? (
                        <span className="inline-flex items-center text-emerald-700 font-bold text-[11px]">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-neutral-400 text-[11px]">
                          <Lock className="w-3 h-3 mr-1" />
                          Locked (PIN required)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
