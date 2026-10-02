import React from 'react';
import {
  User,
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
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PatientPortal: React.FC = () => {
  const {
    currentUser,
    activeUnlockedPin,
    unlockedVideoIds,
    interventions,
    appointments,
    setActiveVideo,
    setPinModalOpen,
    setBookingModalOpen
  } = useApp();

  const myAppointments = appointments.filter(
    (apt) => apt.patientId === currentUser?.id || apt.patientName === currentUser?.name
  );

  const prescribedVideos = interventions.filter((v) =>
    unlockedVideoIds.includes(v.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Patient Profile Card */}
      <div className="border border-neutral-300 bg-white p-6 sm:p-8 rounded-xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-neutral-900 text-white font-garamond text-2xl font-bold flex items-center justify-center shrink-0">
            {currentUser?.name?.charAt(0) || 'P'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-neutral-100 px-2 py-0.5 rounded font-bold text-neutral-800">
                Registered Patient
              </span>
              <span className="text-[10px] text-neutral-400">
                ID: {currentUser?.id || 'pat-101'}
              </span>
            </div>
            <h1 className="font-garamond text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              {currentUser?.name || 'Patient Profile'}
            </h1>
            <p className="text-xs text-neutral-500 font-sans">
              Care regimen under Reality Mind Clinic · Tak Mohalla Road, Bijbehara
            </p>
          </div>
        </div>

        {/* Active Prescription Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {activeUnlockedPin ? (
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Active Prescription: {activeUnlockedPin.code}</span>
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                {prescribedVideos.length} Private Interventions Unlocked
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPinModalOpen(true)}
              className="bg-black text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800"
            >
              Enter Doctor PIN
            </button>
          )}

          <button
            type="button"
            onClick={() => setBookingModalOpen(true)}
            className="border border-neutral-300 hover:border-black px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Book Next Session
          </button>
        </div>
      </div>

      {/* Main Grid: Prescribed Interventions & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Prescribed Intervention Library */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-neutral-200 bg-white rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <h3 className="font-garamond text-2xl font-bold text-neutral-950">
                  Prescribed Clinical Interventions ({prescribedVideos.length})
                </h3>
                <p className="text-xs text-neutral-500">
                  Private sessions assigned by your psychologist for daily home practice.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPinModalOpen(true)}
                className="text-xs font-semibold text-neutral-700 hover:text-black flex items-center gap-1"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Enter New PIN</span>
              </button>
            </div>

            {prescribedVideos.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <Lock className="w-8 h-8 text-neutral-400 mx-auto" />
                <h4 className="font-garamond text-lg font-bold text-neutral-800">
                  No Interventions Unlocked Yet
                </h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Enter the PIN code provided by your psychologist after your consultation to unlock your prescribed video sessions.
                </p>
                <button
                  type="button"
                  onClick={() => setPinModalOpen(true)}
                  className="bg-black text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider"
                >
                  Enter PIN Code
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prescribedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="border border-neutral-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-black transition-all bg-neutral-50/20"
                  >
                    <div>
                      <div className="relative aspect-video bg-neutral-900">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-85"
                        />
                        <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Unlock className="w-2.5 h-2.5" />
                          <span>Prescribed</span>
                        </span>
                        <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded">
                          {video.duration}
                        </span>
                      </div>

                      <div className="p-4 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase text-neutral-400 block font-bold">
                          {video.category}
                        </span>
                        <h4 className="font-garamond text-base font-bold text-neutral-950">
                          {video.title}
                        </h4>
                        <p className="text-[11px] text-neutral-600 line-clamp-2">
                          {video.typicallyAssignedFor}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        type="button"
                        onClick={() => setActiveVideo(video)}
                        className="w-full bg-black text-white py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-neutral-800"
                      >
                        <Play className="w-3 h-3" />
                        <span>Practice Session</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Scheduled Appointments & Reminders */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-neutral-200 bg-white rounded-xl p-6 space-y-4">
            <h3 className="font-garamond text-xl font-bold text-neutral-950 border-b border-neutral-100 pb-3">
              My Appointments
            </h3>

            {myAppointments.length === 0 ? (
              <div className="text-center py-6 text-xs text-neutral-500 space-y-2">
                <Calendar className="w-6 h-6 mx-auto text-neutral-400" />
                <p>No appointments on record.</p>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="text-black font-semibold underline text-xs"
                >
                  Book a Consultation
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3.5 border border-neutral-200 rounded-lg bg-neutral-50/50 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">{apt.service}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          apt.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div className="text-neutral-600 space-y-0.5">
                      <p>
                        📅 <strong>{apt.date}</strong> at {apt.timeSlot}
                      </p>
                      <p>
                        📍{' '}
                        {apt.type === 'offline'
                          ? 'In-Clinic (Tak Mohalla Rd, Bijbehara)'
                          : 'Online Video Call'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clinical Homework Guidelines Card */}
          <div className="border border-neutral-200 bg-neutral-50 rounded-xl p-5 space-y-3 text-xs text-neutral-700">
            <h4 className="font-garamond text-lg font-bold text-neutral-900 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-black" />
              <span>Homework Compliance</span>
            </h4>
            <ul className="space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>Practice your Diaphragmatic Breathing or PMR sequence twice daily.</li>
              <li>Complete your CBT Thought Record whenever an automatic negative thought triggers acute distress.</li>
              <li>Bring your observations to your next appointment at the clinic.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
