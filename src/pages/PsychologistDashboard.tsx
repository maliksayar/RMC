import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Calendar,
  KeyRound,
  Video,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Upload,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Appointment, AccessPin, InterventionVideo, BlogArticle } from '../types';

export const PsychologistDashboard: React.FC = () => {
  const {
    role,
    switchRole,
    appointments,
    updateAppointmentStatus,
    pins,
    generatePin,
    revokePin,
    interventions,
    addIntervention,
    deleteIntervention,
    articles,
    publishArticle
  } = useApp();

  const [activeTab, setActiveTab] = useState<'appointments' | 'pins' | 'videos' | 'articles'>('pins');

  // PIN Generation state
  const [newPatientName, setNewPatientName] = useState('');
  const [selectedVideos, setSelectedVideos] = useState<string[]>([
    'cbt-basics',
    'diaphragmatic-breathing'
  ]);
  const [expiryDays, setExpiryDays] = useState(30);
  const [pinNotes, setPinNotes] = useState('');
  const [generatedPinNotice, setGeneratedPinNotice] = useState<AccessPin | null>(null);
  const [copiedPin, setCopiedPin] = useState(false);

  // New Video State
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoAssignedFor, setNewVideoAssignedFor] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState<'CBT' | 'Mindfulness & Relaxation' | 'Behavioral' | 'Hypnotherapy'>('CBT');
  const [newVideoDuration, setNewVideoDuration] = useState('15 mins');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [newVideoRationale, setNewVideoRationale] = useState('');

  // New Article State
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleCategory, setNewArticleCategory] = useState('Anxiety');
  const [newArticleSummary, setNewArticleSummary] = useState('');
  const [newArticleBody, setNewArticleBody] = useState('');

  const handleCreatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) {
      alert('Please enter patient name.');
      return;
    }
    if (selectedVideos.length === 0) {
      alert('Please assign at least one intervention session.');
      return;
    }

    const created = generatePin(newPatientName, selectedVideos, expiryDays, pinNotes);
    setGeneratedPinNotice(created);
    setNewPatientName('');
    setPinNotes('');
  };

  const handleCopyPin = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const toggleVideoSelection = (id: string) => {
    if (selectedVideos.includes(id)) {
      setSelectedVideos(selectedVideos.filter((v) => v !== id));
    } else {
      setSelectedVideos([...selectedVideos, id]);
    }
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle) return;

    addIntervention({
      title: newVideoTitle,
      typicallyAssignedFor: newVideoAssignedFor || 'Clinical follow-up',
      treatmentArea: 'Anxiety',
      category: newVideoCategory,
      duration: newVideoDuration,
      description: newVideoDesc || 'Tailored clinical guidance video recorded at Reality Mind Clinic.',
      clinicalRationale: newVideoRationale || 'Facilitates patient emotional recovery through systematic practice.',
      tags: ['Clinical Guidance', 'Bijbehara'],
      type: 'video',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      keySteps: [
        'Watch session in a quiet environment',
        'Follow therapist guidance carefully',
        'Record homework observations'
      ]
    });

    setShowAddVideoModal(false);
    setNewVideoTitle('');
    setNewVideoAssignedFor('');
    setNewVideoDesc('');
    setNewVideoRationale('');
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle) return;

    publishArticle({
      title: newArticleTitle,
      subtitle: 'Clinical psychoeducational insights from Reality Mind Clinic.',
      category: newArticleCategory,
      readTime: '5 min read',
      author: 'Dr. Psychologist (Bijbehara)',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      summary: newArticleSummary || 'A clinical overview of evidence-based psychological tools.',
      sections: [
        {
          heading: 'Core Psychological Concepts',
          body: newArticleBody || 'Psychoeducation enables patients to understand how neural pathways adapt with consistent practice.'
        }
      ],
      keyTakeaways: [
        'Early intervention prevents symptom consolidation',
        'Consistent behavioral follow-through is paramount'
      ]
    });

    setShowAddArticleModal(false);
    setNewArticleTitle('');
    setNewArticleSummary('');
    setNewArticleBody('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-300">
              Clinical Control Panel · Section 5 & 6
            </span>
          </div>
          <h1 className="font-garamond text-3xl sm:text-4xl font-bold">
            Psychologist Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            Centralized practice management: generate secure PINs, prescribe intervention videos, manage appointment status, and publish psychoeducation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400">Current Role:</span>
          <button
            type="button"
            onClick={() => switchRole('patient')}
            className="text-xs bg-white text-black px-3.5 py-1.5 rounded font-semibold hover:bg-neutral-200 transition-colors"
          >
            Switch to Patient View
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 gap-4 text-xs font-semibold uppercase tracking-wider overflow-x-auto pb-0.5">
        <button
          type="button"
          onClick={() => setActiveTab('pins')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'pins'
              ? 'border-black text-black'
              : 'border-transparent text-neutral-500 hover:text-black'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>PIN Generator & Video Access ({pins.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appointments')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'appointments'
              ? 'border-black text-black'
              : 'border-transparent text-neutral-500 hover:text-black'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Patient Appointments ({appointments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('videos')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'videos'
              ? 'border-black text-black'
              : 'border-transparent text-neutral-500 hover:text-black'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Private Video Vault ({interventions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('articles')}
          className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'articles'
              ? 'border-black text-black'
              : 'border-transparent text-neutral-500 hover:text-black'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Published Articles ({articles.length})</span>
        </button>
      </div>

      {/* TAB 1: PIN GENERATOR & ACCESS MANAGEMENT */}
      {activeTab === 'pins' && (
        <div className="space-y-8">
          {/* Newly Generated PIN notification box */}
          {generatedPinNotice && (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-lg space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>PIN Successfully Issued for {generatedPinNotice.patientName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setGeneratedPinNotice(null)}
                  className="text-xs text-neutral-400 hover:text-black"
                >
                  Dismiss
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded border border-emerald-200">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-500">
                    Access Code
                  </span>
                  <div className="font-mono text-3xl font-extrabold text-neutral-900 tracking-wider">
                    {generatedPinNotice.code}
                  </div>
                </div>

                <div className="text-xs text-neutral-600 flex-1">
                  <p>
                    Unlocked: <strong>{generatedPinNotice.assignedVideoIds.length} clinical sessions</strong>
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Expires on {new Date(generatedPinNotice.expiresAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyPin(generatedPinNotice.code)}
                  className="bg-black text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider"
                >
                  {copiedPin ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPin ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* PIN Generation Form */}
            <div className="lg:col-span-5 border border-neutral-300 bg-white p-6 rounded-lg space-y-5">
              <div className="space-y-1 border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                  Clinical Prescription
                </span>
                <h3 className="font-garamond text-2xl font-bold text-neutral-950">
                  Generate Patient Access PIN
                </h3>
                <p className="text-xs text-neutral-600">
                  Select which intervention videos to authorize for the patient following consultation.
                </p>
              </div>

              <form onSubmit={handleCreatePin} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Patient Name / Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aamir Mir"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    PIN Validity Duration
                  </label>
                  <select
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden bg-white"
                  >
                    <option value={7}>7 Days (Acute crisis follow-up)</option>
                    <option value={14}>14 Days (Standard homework window)</option>
                    <option value={30}>30 Days (Full monthly treatment block)</option>
                    <option value={90}>90 Days (Extended maintenance)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Clinical Notes / Indication
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Focus on diaphragmatic pacing & ERP exposure ladder"
                    value={pinNotes}
                    onChange={(e) => setPinNotes(e.target.value)}
                    className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:border-black focus:outline-hidden"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                      Assign Intervention Videos ({selectedVideos.length} selected)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedVideos(
                          selectedVideos.length === interventions.length
                            ? []
                            : interventions.map((v) => v.id)
                        )
                      }
                      className="text-[10px] text-neutral-600 hover:text-black font-semibold"
                    >
                      {selectedVideos.length === interventions.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-1.5 border border-neutral-200 rounded p-2 bg-neutral-50/50">
                    {interventions.map((video) => (
                      <label
                        key={video.id}
                        className="flex items-center gap-2 p-1.5 rounded hover:bg-neutral-100 cursor-pointer text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={selectedVideos.includes(video.id)}
                          onChange={() => toggleVideoSelection(video.id)}
                          className="rounded border-neutral-400 text-black focus:ring-black"
                        />
                        <span className="font-medium text-neutral-900 truncate">
                          {video.title}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 ml-auto shrink-0">
                          {video.duration}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Generate & Issue Access PIN</span>
                </button>
              </form>
            </div>

            {/* Issued PINs List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="border border-neutral-200 bg-white rounded-lg p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <div>
                    <h3 className="font-garamond text-xl font-bold text-neutral-950">
                      Active & Historical Access PINs
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Revoke or monitor expiration dates for patient keys.
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-neutral-100 px-2 py-1 rounded text-neutral-700">
                    {pins.length} Total Keys
                  </span>
                </div>

                <div className="space-y-3">
                  {pins.map((pin) => {
                    const isExpired = new Date(pin.expiresAt) < new Date();
                    const isRevoked = pin.status === 'revoked';

                    return (
                      <div
                        key={pin.id}
                        className="border border-neutral-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-50/30"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-base text-neutral-950">
                              {pin.code}
                            </span>
                            <span className="text-xs font-semibold text-neutral-800">
                              · {pin.patientName}
                            </span>

                            {isRevoked ? (
                              <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold uppercase">
                                Revoked
                              </span>
                            ) : isExpired ? (
                              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold uppercase">
                                Expired
                              </span>
                            ) : (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold uppercase">
                                Active
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-neutral-600">
                            {pin.assignedVideoIds.length} Assigned Interventions · Note: "{pin.notes}"
                          </p>

                          <div className="text-[11px] text-neutral-400 font-mono">
                            Expires: {new Date(pin.expiresAt).toLocaleDateString()} · Issued by {pin.issuedBy}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <button
                            type="button"
                            onClick={() => handleCopyPin(pin.code)}
                            className="p-1.5 border border-neutral-300 rounded text-neutral-700 hover:bg-neutral-100"
                            title="Copy PIN Code"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          {pin.status === 'active' && (
                            <button
                              type="button"
                              onClick={() => revokePin(pin.id)}
                              className="text-xs text-rose-600 hover:text-rose-800 border border-rose-200 hover:border-rose-400 px-2.5 py-1 rounded"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PATIENT APPOINTMENTS MANAGEMENT */}
      {activeTab === 'appointments' && (
        <div className="border border-neutral-300 bg-white rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <div>
              <h3 className="font-garamond text-2xl font-bold text-neutral-950">
                Scheduled Consultations
              </h3>
              <p className="text-xs text-neutral-500">
                Online video sessions and in-clinic consultations at Tak Mohalla Road, Bijbehara.
              </p>
            </div>
          </div>

          <div className="divide-y divide-neutral-200">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-500">
                      {apt.id}
                    </span>
                    <h4 className="font-garamond text-lg font-bold text-neutral-950">
                      {apt.patientName}
                    </h4>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        apt.type === 'offline'
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-900 border border-neutral-300'
                      }`}
                    >
                      {apt.type === 'offline' ? 'In-Clinic (Bijbehara)' : 'Online Video'}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : apt.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : apt.status === 'completed'
                          ? 'bg-neutral-200 text-neutral-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-700">
                    <strong className="text-neutral-900">{apt.service}</strong> · Concern:{' '}
                    <strong className="text-neutral-900">{apt.treatmentArea}</strong>
                  </p>

                  <div className="text-xs text-neutral-500 flex flex-wrap gap-4 pt-0.5">
                    <span>
                      📅 <strong>{apt.date}</strong> at {apt.timeSlot}
                    </span>
                    <span>📞 {apt.patientPhone}</span>
                    <span>✉️ {apt.patientEmail}</span>
                  </div>

                  {apt.notes && (
                    <p className="text-[11px] text-neutral-600 italic bg-neutral-50 p-2 rounded border border-neutral-100 mt-1">
                      Patient note: "{apt.notes}"
                    </p>
                  )}
                </div>

                {/* Status action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {apt.status !== 'confirmed' && (
                    <button
                      type="button"
                      onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                      className="px-3 py-1.5 bg-neutral-900 text-white rounded text-xs font-semibold hover:bg-neutral-800"
                    >
                      Confirm
                    </button>
                  )}

                  {apt.status !== 'completed' && (
                    <button
                      type="button"
                      onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                      className="px-3 py-1.5 border border-neutral-300 rounded text-xs font-semibold hover:bg-neutral-100"
                    >
                      Mark Done
                    </button>
                  )}

                  {apt.status !== 'cancelled' && (
                    <button
                      type="button"
                      onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                      className="px-3 py-1.5 border border-neutral-300 text-neutral-600 rounded text-xs font-semibold hover:text-rose-600 hover:border-rose-300"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRIVATE VIDEO REPOSITORY MANAGEMENT */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="border border-neutral-300 bg-white rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <h3 className="font-garamond text-2xl font-bold text-neutral-950">
                  Cloudinary Private Video Repository
                </h3>
                <p className="text-xs text-neutral-500">
                  Upload and organize intervention sessions delivered via signed, expiring URLs.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddVideoModal(true)}
                className="bg-black text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Upload / Add Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {interventions.map((video) => (
                <div
                  key={video.id}
                  className="border border-neutral-200 rounded-lg p-4 space-y-3 bg-neutral-50/40 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded font-bold">
                      {video.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteIntervention(video.id)}
                      className="text-neutral-400 hover:text-rose-600"
                      title="Delete Video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-garamond text-lg font-bold text-neutral-950">
                    {video.title}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="pt-2 text-[10px] font-mono text-neutral-500 flex justify-between border-t border-neutral-200">
                    <span>{video.duration}</span>
                    <span>Target: {video.treatmentArea}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PUBLISHED ARTICLES */}
      {activeTab === 'articles' && (
        <div className="border border-neutral-300 bg-white rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <div>
              <h3 className="font-garamond text-2xl font-bold text-neutral-950">
                Psychoeducation Article Publisher
              </h3>
              <p className="text-xs text-neutral-500">
                Draft and release clinical guidance for patients and the public.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddArticleModal(true)}
              className="bg-black text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Publish New Article</span>
            </button>
          </div>

          <div className="space-y-4">
            {articles.map((art) => (
              <div
                key={art.id}
                className="border border-neutral-200 rounded-lg p-5 flex flex-col sm:flex-row items-start justify-between gap-4 hover:border-black transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-500 text-[10px]">
                      {art.category}
                    </span>
                    <span>·</span>
                    <span className="text-neutral-400">{art.publishedDate}</span>
                  </div>
                  <h4 className="font-garamond text-xl font-bold text-neutral-950">
                    {art.title}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2 max-w-2xl">
                    {art.summary}
                  </p>
                </div>

                <div className="text-xs font-mono text-neutral-500 shrink-0">
                  {art.readTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD VIDEO */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-neutral-300 w-full max-w-md rounded-lg shadow-xl p-6 space-y-4">
            <h3 className="font-garamond text-xl font-bold">Add Clinical Intervention Video</h3>
            <form onSubmit={handleAddVideo} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cognitive Defusion on Leaves"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Typically Assigned For *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anxiety, overthinking"
                  value={newVideoAssignedFor}
                  onChange={(e) => setNewVideoAssignedFor(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={newVideoCategory}
                    onChange={(e: any) => setNewVideoCategory(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded bg-white"
                  >
                    <option value="CBT">CBT</option>
                    <option value="Mindfulness & Relaxation">Mindfulness & Relaxation</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="Hypnotherapy">Hypnotherapy</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Duration</label>
                  <input
                    type="text"
                    value={newVideoDuration}
                    onChange={(e) => setNewVideoDuration(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newVideoDesc}
                  onChange={(e) => setNewVideoDesc(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddVideoModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded font-semibold"
                >
                  Save & Encrypt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ARTICLE */}
      {showAddArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-neutral-300 w-full max-w-md rounded-lg shadow-xl p-6 space-y-4">
            <h3 className="font-garamond text-xl font-bold">Publish Psychoeducation Article</h3>
            <form onSubmit={handleAddArticle} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Breaking Panic Loops with Vagus Stimulation"
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Panic & Anxiety"
                  value={newArticleCategory}
                  onChange={(e) => setNewArticleCategory(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Executive Summary</label>
                <textarea
                  rows={2}
                  value={newArticleSummary}
                  onChange={(e) => setNewArticleSummary(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Article Content</label>
                <textarea
                  rows={4}
                  value={newArticleBody}
                  onChange={(e) => setNewArticleBody(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddArticleModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded font-semibold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
