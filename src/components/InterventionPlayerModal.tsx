import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InterventionPlayerModal: React.FC = () => {
  const { activeVideo, setActiveVideo, activeUnlockedPin } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [isMuted, setIsMuted] = useState(false);

  if (!activeVideo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-neutral-300 w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden relative max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between shrink-0 bg-neutral-900 text-white">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <div>
              <div className="flex items-center gap-2">
                {activeVideo.category && (
                  <span className="text-[10px] uppercase font-mono tracking-widest bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                    {activeVideo.category}
                  </span>
                )}
                {activeVideo.typicallyAssignedFor && (
                  <span className="text-[10px] text-neutral-400">
                    Target: {activeVideo.typicallyAssignedFor}
                  </span>
                )}
              </div>
              <h3 className="font-garamond text-xl sm:text-2xl font-bold text-white mt-0.5">
                {activeVideo.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <div className="space-y-4">
            {activeVideo.videoUrl ? (
              <div className="space-y-3">
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-neutral-800">
                  <video
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    poster={activeVideo.thumbnailUrl}
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500 font-mono bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Cloudinary Verified Clinical Stream</span>
                  </div>
                  <span>PIN Access: {activeUnlockedPin?.code || 'Prescribed Session'}</span>
                </div>
              </div>
            ) : (
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
                    <span>Cloudinary Video Stream · Prescribed Guidance</span>
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
                    className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto hover:scale-105 transition-transform shadow-xl cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </button>
                  <p className="text-white text-xs font-semibold mt-3 tracking-wide drop-shadow-md">
                    {isPlaying ? 'Session Streaming' : 'Click to Play Guidance'}
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
                        className="hover:text-white cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setProgress(0)}
                        className="hover:text-white cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-white cursor-pointer"
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
            )}

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded text-xs space-y-2">
              <h5 className="font-bold uppercase tracking-wider text-neutral-900">
                Therapeutic Description & Purpose
              </h5>
              <p className="text-neutral-700 leading-relaxed">{activeVideo.description}</p>
              {activeVideo.clinicalRationale && (
                <div className="pt-1 text-[11px] text-neutral-500">
                  <span className="font-semibold text-neutral-800">Clinical Rationale:</span> {activeVideo.clinicalRationale}
                </div>
              )}
            </div>
          </div>
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
            className="bg-black text-white px-4 py-2 rounded uppercase tracking-wider font-semibold text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Close Session
          </button>
        </div>
      </div>
    </div>
  );
};
