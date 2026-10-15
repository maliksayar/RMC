import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  AlertCircle,
  Phone,
  MessageCircle,
  Search,
  Filter,
  Bell,
  Eye,
  Lock,
  Unlock,
  Activity,
  Layers,
  Send,
  Play,
  Film,
  Loader2,
  Cloud,
  UploadCloud,
  X,
  User as UserIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Appointment, AccessPin, InterventionVideo, BlogArticle, ClinicService, TreatmentArea } from '../types';
import { cloudinaryService, isCloudinaryConfigured } from '../lib/cloudinaryService';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    role,
    isAdmin,
    appointments,
    updateAppointmentStatus,
    bookAppointment,
    pins,
    generatePin,
    revokePin,
    interventions,
    addIntervention,
    deleteIntervention,
    updateIntervention,
    articles,
    publishArticle,
    notifications,
    broadcastNotification,
    isSupabaseLive,
    setActiveVideo,
    updateUserProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'pins' | 'videos' | 'articles' | 'broadcast' | 'profile'>('overview');

  // Doctor & Clinic Profile State
  const [docName, setDocName] = useState(currentUser?.name || 'Dr. Malik Sayar');
  const [docPhone, setDocPhone] = useState(currentUser?.phone || '+91 6005754205');
  const [docEmail, setDocEmail] = useState(currentUser?.email || 'doctor@realitymindclinic.com');
  const [clinicAddress, setClinicAddress] = useState('Tak Mohalla Road, Bijbehara, Anantnag, J&K — 192124');
  const [clinicHours, setClinicHours] = useState('Mon - Sat: 10:00 AM - 6:00 PM');
  const [docProfileSaved, setDocProfileSaved] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setDocName(currentUser.name || 'Dr. Malik Sayar');
      setDocPhone(currentUser.phone || '+91 6005754205');
      setDocEmail(currentUser.email || 'doctor@realitymindclinic.com');
    }
  }, [currentUser]);

  const handleSaveDocProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      name: docName.trim(),
      phone: docPhone.trim(),
      email: docEmail.trim()
    });
    setDocProfileSaved(true);
    setTimeout(() => setDocProfileSaved(false), 3000);
  };

  // Search & Filter States
  const [aptFilter, setAptFilter] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all');
  const [aptSearch, setAptSearch] = useState('');
  const [videoFilter, setVideoFilter] = useState<string>('all');
  const [videoSearch, setVideoSearch] = useState('');

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
  const [newVideoTreatmentArea, setNewVideoTreatmentArea] = useState<TreatmentArea>('Anxiety');
  const [newVideoDuration, setNewVideoDuration] = useState('15 mins');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [newVideoRationale, setNewVideoRationale] = useState('');
  const [newVideoIsRestricted, setNewVideoIsRestricted] = useState(true);
  const [newVideoInteractiveType, setNewVideoInteractiveType] = useState<string>('breathing');

  // Cloudinary Direct Video Upload States
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUploadProgress, setVideoUploadProgress] = useState<number>(0);
  const [isUploadingVideo, setIsUploadingVideo] = useState<boolean>(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>('');
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState<string>('');
  const [videoUploadError, setVideoUploadError] = useState<string>('');
  const [manualVideoUrl, setManualVideoUrl] = useState<string>('');
  const [showManualUrlInput, setShowManualUrlInput] = useState<boolean>(false);

  // New Article State
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleCategory, setNewArticleCategory] = useState('Anxiety');
  const [newArticleSummary, setNewArticleSummary] = useState('');
  const [newArticleBody, setNewArticleBody] = useState('');

  // Doctor Quick Appointment State
  const [showAddAptModal, setShowAddAptModal] = useState(false);
  const [newAptName, setNewAptName] = useState('');
  const [newAptPhone, setNewAptPhone] = useState('');
  const [newAptEmail, setNewAptEmail] = useState('');
  const [newAptService, setNewAptService] = useState<ClinicService>('Psychotherapy');
  const [newAptTreatmentArea, setNewAptTreatmentArea] = useState<TreatmentArea>('Anxiety');
  const [newAptType, setNewAptType] = useState<'offline' | 'online'>('offline');
  const [newAptDate, setNewAptDate] = useState('2026-10-20');
  const [newAptTimeSlot, setNewAptTimeSlot] = useState('10:00 AM');
  const [newAptNotes, setNewAptNotes] = useState('');

  // Broadcast Alert State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Handlers
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

  const resetVideoForm = () => {
    setShowAddVideoModal(false);
    setNewVideoTitle('');
    setNewVideoAssignedFor('');
    setNewVideoDesc('');
    setNewVideoRationale('');
    setNewVideoDuration('15 mins');
    setVideoFile(null);
    setVideoUploadProgress(0);
    setIsUploadingVideo(false);
    setUploadedVideoUrl('');
    setUploadedThumbnailUrl('');
    setVideoUploadError('');
    setManualVideoUrl('');
    setShowManualUrlInput(false);
  };

  const handleVideoFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoFile(file);
    setVideoUploadError('');
    setIsUploadingVideo(true);
    setVideoUploadProgress(0);

    try {
      const result = await cloudinaryService.uploadVideo(file, (percent) => {
        setVideoUploadProgress(percent);
      });

      setUploadedVideoUrl(result.secureUrl);
      if (result.thumbnailUrl) {
        setUploadedThumbnailUrl(result.thumbnailUrl);
      }
      if (result.duration) {
        setNewVideoDuration(result.duration);
      }
      // If title is currently empty, prefill cleanly from the video filename
      if (!newVideoTitle.trim()) {
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .trim();
        setNewVideoTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      setVideoUploadError(err?.message || 'Failed to upload video to Cloudinary.');
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle) return;

    const finalVideoUrl = uploadedVideoUrl || manualVideoUrl.trim() || undefined;
    const finalThumbnail =
      uploadedThumbnailUrl ||
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80';

    addIntervention({
      title: newVideoTitle,
      typicallyAssignedFor: newVideoAssignedFor || 'Clinical prescribed regimen',
      treatmentArea: newVideoTreatmentArea,
      category: newVideoCategory,
      duration: newVideoDuration,
      isRestricted: newVideoIsRestricted,
      description: newVideoDesc || 'Tailored clinical guidance video recorded at Reality Mind Clinic.',
      clinicalRationale: newVideoRationale || 'Facilitates patient emotional recovery through systematic practice.',
      tags: ['Clinical Guidance', 'Bijbehara', finalVideoUrl ? 'Cloudinary Stream' : 'Interactive'],
      type: finalVideoUrl ? 'video' : 'interactive',
      videoUrl: finalVideoUrl,
      interactiveType: newVideoInteractiveType as any,
      thumbnailUrl: finalThumbnail,
      keySteps: [
        'Watch and practice in a calm, quiet environment',
        'Follow therapist pacing and rhythmic instruction',
        'Record homework observations in thought record'
      ]
    });

    resetVideoForm();
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle) return;

    publishArticle({
      title: newArticleTitle,
      subtitle: 'Clinical psychoeducational insights from Reality Mind Clinic.',
      category: newArticleCategory,
      readTime: '5 min read',
      author: 'Dr. Malik Sayar (Lead Psychologist)',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      summary: newArticleSummary || 'Evidence-based insights into mental health and nervous system regulation.',
      sections: [
        {
          heading: 'Clinical Overview',
          body: newArticleBody || 'Structured guidance on symptom recognition and therapeutic interventions.'
        }
      ],
      keyTakeaways: [
        'Consistency in practice leads to neuroplastic stabilization.',
        'Somatic calming practices should be scheduled rather than reactive.',
        'Regular clinical follow-up ensures sustained therapeutic progress.'
      ]
    });

    setShowAddArticleModal(false);
    setNewArticleTitle('');
    setNewArticleSummary('');
    setNewArticleBody('');
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAptName || !newAptPhone) {
      alert('Please provide patient name and contact phone.');
      return;
    }

    bookAppointment({
      patientId: `pat-${Date.now()}`,
      patientName: newAptName,
      patientPhone: newAptPhone,
      patientEmail: newAptEmail || 'patient@realitymindclinic.com',
      service: newAptService,
      treatmentArea: newAptTreatmentArea,
      type: newAptType,
      date: newAptDate,
      timeSlot: newAptTimeSlot,
      notes: newAptNotes || 'Directly scheduled by doctor at clinic.'
    });

    setShowAddAptModal(false);
    setNewAptName('');
    setNewAptPhone('');
    setNewAptEmail('');
    setNewAptNotes('');
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMsg) return;
    broadcastNotification(broadcastTitle, broadcastMsg, 'all');
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastTitle('');
      setBroadcastMsg('');
    }, 2500);
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = aptFilter === 'all' || apt.status === aptFilter;
    const matchesSearch =
      aptSearch === '' ||
      apt.patientName.toLowerCase().includes(aptSearch.toLowerCase()) ||
      apt.patientPhone.includes(aptSearch) ||
      apt.service.toLowerCase().includes(aptSearch.toLowerCase()) ||
      apt.treatmentArea.toLowerCase().includes(aptSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filtered Interventions
  const filteredInterventions = interventions.filter((item) => {
    const matchesFilter = videoFilter === 'all' || item.category === videoFilter;
    const matchesSearch =
      videoSearch === '' ||
      item.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(videoSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Professional Admin Banner */}
      <div className="bg-[#121212] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-white text-black px-2 py-0.5 rounded font-bold">
                Doctor Admin Panel
              </span>
              <span className="text-[10px] text-neutral-400">
                Reality Mind Clinic · Tak Mohalla Road, Bijbehara
              </span>
              {isSupabaseLive ? (
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                  ● Supabase DB Connected
                </span>
              ) : (
                <span className="text-[10px] text-amber-300 font-mono bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded-full">
                  ● Local Persistence Mode
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Clinical Administration & Patient Management
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Logged in as <strong>{currentUser?.name || 'Dr. Malik Sayar'}</strong> · Overseeing appointments, prescriptions, video interventions & psychoeducation.
            </p>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('pins');
              window.scrollTo({ top: 350, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Prescribe PIN</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddAptModal(true)}
            className="px-3.5 py-2 bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-neutral-200 pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: Activity, count: null },
          { id: 'appointments', label: 'Appointments', icon: Calendar, count: appointments.length },
          { id: 'pins', label: 'Prescription PINs', icon: KeyRound, count: pins.length },
          { id: 'videos', label: 'Interventions Library', icon: Video, count: interventions.length },
          { id: 'articles', label: 'Articles & Guides', icon: FileText, count: articles.length },
          { id: 'broadcast', label: 'Notification Center', icon: Bell, count: notifications.length },
          { id: 'profile', label: 'Doctor Profile', icon: UserIcon, count: null }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                active
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW & CLINIC METRICS */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold uppercase">
                <span>Total Consultations</span>
                <Calendar className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-3xl font-serif font-bold text-neutral-950">
                {appointments.length}
              </div>
              <p className="text-[11px] text-neutral-500">
                {appointments.filter((a) => a.status === 'confirmed').length} confirmed / upcoming
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold uppercase">
                <span>Active Prescriptions</span>
                <KeyRound className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-3xl font-serif font-bold text-neutral-950">
                {pins.filter((p) => p.status === 'active').length}
              </div>
              <p className="text-[11px] text-neutral-500">
                Tailored patient access PINs currently unlocked
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold uppercase">
                <span>Clinical Interventions</span>
                <Video className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-3xl font-serif font-bold text-neutral-950">
                {interventions.length}
              </div>
              <p className="text-[11px] text-neutral-500">
                {interventions.filter((v) => v.isRestricted).length} PIN-restricted / {interventions.filter((v) => !v.isRestricted).length} public
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-xs font-semibold uppercase">
                <span>Psychoeducation Guides</span>
                <FileText className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-3xl font-serif font-bold text-neutral-950">
                {articles.length}
              </div>
              <p className="text-[11px] text-neutral-500">
                Evidence-based clinical articles published
              </p>
            </div>
          </div>

          {/* Quick Doctor Actions & Recent Appointments Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Quick Actions */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neutral-700" />
                  <span>Doctor Quick Actions</span>
                </h3>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('pins')}
                    className="p-3 rounded-lg border border-neutral-200 hover:border-black text-left flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">Issue Patient Access PIN</div>
                        <div className="text-[11px] text-neutral-500">Assign therapeutic videos to client</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddAptModal(true)}
                    className="p-3 rounded-lg border border-neutral-200 hover:border-black text-left flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">Book In-Clinic Consultation</div>
                        <div className="text-[11px] text-neutral-500">Manual booking for walk-in patient</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddVideoModal(true)}
                    className="p-3 rounded-lg border border-neutral-200 hover:border-black text-left flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">Add Clinical Intervention Video</div>
                        <div className="text-[11px] text-neutral-500">Upload new somatic or CBT guidance</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddArticleModal(true)}
                    className="p-3 rounded-lg border border-neutral-200 hover:border-black text-left flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">Publish Psychoeducational Article</div>
                        <div className="text-[11px] text-neutral-500">Post clinical insights for patients</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Clinic Helplines Summary */}
              <div className="p-4 bg-neutral-100 rounded-xl text-xs space-y-2 border border-neutral-200">
                <span className="font-bold text-neutral-800 uppercase text-[10px] tracking-wider block">
                  Clinic Location & Helpline
                </span>
                <p className="text-neutral-600">
                  <strong>Address:</strong> Tak Mohalla Road, Bijbehara, Anantnag, J&K — 192124
                </p>
                <p className="text-neutral-600">
                  <strong>Consultation Phone:</strong> +91 6005754205 (WhatsApp Enabled)
                </p>
              </div>
            </div>

            {/* Right: Upcoming Consultations */}
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    Latest Scheduled Consultations
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Showing latest consultations booked via web & clinic
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs font-semibold text-neutral-900 underline hover:text-neutral-600"
                >
                  View All ({appointments.length})
                </button>
              </div>

              <div className="space-y-3">
                {appointments.slice(0, 4).map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3.5 rounded-lg border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-neutral-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 text-xs">{apt.patientName}</span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : apt.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {apt.status}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {apt.type === 'offline' ? 'In-Clinic (Bijbehara)' : 'Online Call'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {apt.service} · {apt.treatmentArea} · <strong>{apt.date}</strong> at <strong>{apt.timeSlot}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`https://wa.me/${apt.patientPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(apt.patientName)},%20this%20is%20Dr.%20Malik%20Sayar%20from%20Reality%20Mind%20Clinic%20regarding%20your%20consultation.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:${apt.patientPhone}`}
                        className="p-1.5 rounded-md border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors"
                        title="Call Patient"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                        className="px-2 py-1 bg-neutral-900 text-white rounded text-[10px] font-semibold hover:bg-neutral-800"
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: APPOINTMENTS FULL MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-neutral-950">
                  Consultation Appointments Roster
                </h2>
                <p className="text-xs text-neutral-500">
                  Manage patient bookings, confirm slots, mark completed sessions, or contact clients directly.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddAptModal(true)}
                className="px-4 py-2 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add In-Clinic Booking</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg w-full sm:w-auto">
                {(['all', 'confirmed', 'pending', 'completed', 'cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setAptFilter(st)}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-md capitalize transition-colors ${
                      aptFilter === st ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  value={aptSearch}
                  onChange={(e) => setAptSearch(e.target.value)}
                  placeholder="Search patient, phone, service..."
                  className="w-full pl-8 pr-3 py-1.5 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Appointments Table / List */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center text-neutral-400 text-xs">
                No appointments found matching current filter or search criteria.
              </div>
            ) : (
              <div className="divide-y divide-neutral-200">
                {filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-serif text-base font-bold text-neutral-900">
                          {apt.patientName}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : apt.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {apt.status}
                        </span>
                        <span className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                          ID: {apt.id}
                        </span>
                        <span className="text-xs font-semibold text-neutral-800">
                          {apt.type === 'offline' ? '📍 In-Clinic (Tak Mohalla Road)' : '💻 Online Consultation'}
                        </span>
                      </div>

                      <div className="text-xs text-neutral-600 flex items-center gap-4 flex-wrap">
                        <span><strong>Service:</strong> {apt.service}</span>
                        <span><strong>Focus Area:</strong> {apt.treatmentArea}</span>
                        <span><strong>Slot:</strong> {apt.date} at {apt.timeSlot}</span>
                      </div>

                      <div className="text-xs text-neutral-500 flex items-center gap-3">
                        <span>Phone: <strong className="font-mono text-neutral-700">{apt.patientPhone}</strong></span>
                        {apt.patientEmail && <span>Email: {apt.patientEmail}</span>}
                      </div>

                      {apt.notes && (
                        <p className="text-[11px] text-neutral-500 italic bg-neutral-50 p-2 rounded border border-neutral-200 mt-1">
                          Note: "{apt.notes}"
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <a
                        href={`https://wa.me/${apt.patientPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(apt.patientName)},%20this%20is%20Dr.%20Malik%20Sayar%20from%20Reality%20Mind%20Clinic.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-800 hover:bg-emerald-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${apt.patientPhone}`}
                        className="px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>

                      {apt.status !== 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                          className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800"
                        >
                          Confirm
                        </button>
                      )}

                      {apt.status !== 'completed' && (
                        <button
                          type="button"
                          onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                          className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800"
                        >
                          Mark Completed
                        </button>
                      )}

                      {apt.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                          className="px-3 py-1.5 border border-red-300 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PRESCRIPTIONS & PIN ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'pins' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: PIN Generator */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-5">
            <div>
              <h2 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-neutral-800" />
                <span>Issue Prescription PIN</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Prescribe clinical exercises to a patient. The patient will unlock these sessions on their device using the generated code.
              </p>
            </div>

            {generatedPinNotice && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-800">
                    PIN Successfully Issued!
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyPin(generatedPinNotice.code)}
                    className="text-xs text-emerald-900 font-bold underline flex items-center gap-1"
                  >
                    {copiedPin ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPin ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <div className="text-2xl font-mono font-bold text-neutral-950 tracking-wider">
                  {generatedPinNotice.code}
                </div>
                <p className="text-xs text-emerald-900">
                  Assigned to: <strong>{generatedPinNotice.patientName}</strong> ({generatedPinNotice.assignedVideoIds.length} clinical sessions).
                </p>
                <div className="pt-1">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Hello ${generatedPinNotice.patientName}, your prescribed clinical exercises from Reality Mind Clinic are ready. Unlock them at https://rmc.clinic using PIN: ${generatedPinNotice.code}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Share PIN via WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleCreatePin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="e.g. Farooq Ahmad"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Prescription Validity Duration
                </label>
                <select
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                >
                  <option value={7}>7 Days Access (Acute stabilization)</option>
                  <option value={14}>14 Days Access (Bi-weekly review)</option>
                  <option value={30}>30 Days Access (Standard monthly regimen)</option>
                  <option value={60}>60 Days Access (Comprehensive recovery)</option>
                  <option value={90}>90 Days Access (Long-term maintenance)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Clinical Rationale / Notes
                </label>
                <input
                  type="text"
                  value={pinNotes}
                  onChange={(e) => setPinNotes(e.target.value)}
                  placeholder="e.g. Somatic panic management & bedtime sleep protocol"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase text-neutral-700">
                    Assign Therapeutic Interventions ({selectedVideos.length} Selected)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedVideos.length === interventions.length) {
                        setSelectedVideos([]);
                      } else {
                        setSelectedVideos(interventions.map((v) => v.id));
                      }
                    }}
                    className="text-[10px] font-bold text-neutral-600 underline"
                  >
                    {selectedVideos.length === interventions.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>

                <div className="space-y-1.5 max-h-52 overflow-y-auto border border-neutral-200 rounded-lg p-2.5">
                  {interventions.map((video) => {
                    const isSelected = selectedVideos.includes(video.id);
                    return (
                      <div
                        key={video.id}
                        onClick={() => toggleVideoSelection(video.id)}
                        className={`p-2 rounded text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-neutral-900 text-white font-medium'
                            : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className="block truncate">{video.title}</span>
                          <span className="text-[10px] opacity-75">{video.duration} · {video.category}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded text-black shrink-0"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 shadow-xs"
              >
                Generate & Issue PIN
              </button>
            </form>
          </div>

          {/* Right: Issued PINs Registry */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-neutral-900">
                  Prescription PINs Registry
                </h2>
                <p className="text-xs text-neutral-500">
                  {pins.length} access codes issued to clinic patients
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {pins.map((pin) => (
                <div
                  key={pin.id}
                  className="p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-neutral-400 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-neutral-950 bg-neutral-100 px-2.5 py-0.5 rounded border border-neutral-300">
                        {pin.code}
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          pin.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : pin.status === 'revoked'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {pin.status}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-neutral-900">
                      Patient: {pin.patientName}
                    </div>

                    <p className="text-[11px] text-neutral-500">
                      Unlocks {pin.assignedVideoIds.length} sessions · Expires: {new Date(pin.expiresAt).toLocaleDateString()}
                    </p>

                    {pin.notes && (
                      <p className="text-[10px] text-neutral-400 italic">
                        Note: {pin.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyPin(pin.code)}
                      className="px-2.5 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:border-black text-xs font-medium flex items-center gap-1"
                      title="Copy PIN"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>

                    {pin.status === 'active' && (
                      <button
                        type="button"
                        onClick={() => revokePin(pin.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-xs font-medium"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: INTERVENTIONS & VIDEO CMS (CLOUDINARY POWERED) */}
      {/* ========================================================================= */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          {/* Cloudinary Integration Status Bar */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  isCloudinaryConfigured
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-amber-50 text-amber-600 border border-amber-200'
                }`}
              >
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-bold text-neutral-900">
                    Cloudinary Clinical Video Storage
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                      isCloudinaryConfigured
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isCloudinaryConfigured ? 'Live Connected' : 'Local Preview Mode'}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {isCloudinaryConfigured
                    ? `Cloud: ${cloudinaryService.cloudName} · Preset: ${cloudinaryService.uploadPreset} · Folder: rmc_clinical_videos`
                    : 'Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env to stream production uploads.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAddVideoModal(true)}
              className="px-4 py-2 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 flex items-center gap-1.5 shadow-xs shrink-0"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Video / Intervention</span>
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={videoSearch}
                onChange={(e) => setVideoSearch(e.target.value)}
                placeholder="Search intervention title, clinical rationale, or guidance..."
                className="w-full pl-9 pr-3 py-2 border border-neutral-200 rounded-lg text-xs focus:outline-hidden focus:border-black"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['all', 'CBT', 'Mindfulness & Relaxation', 'Behavioral', 'Hypnotherapy'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setVideoFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    videoFilter === cat
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat === 'all' ? 'All Interventions' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInterventions.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden flex flex-col justify-between hover:border-neutral-400 transition-colors"
              >
                <div>
                  <div className="h-44 relative bg-neutral-900 group">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-80"
                    />

                    {/* Overlay Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase bg-black/80 backdrop-blur-xs text-white px-2 py-0.5 rounded font-bold">
                        {video.category}
                      </span>
                      {video.isRestricted ? (
                        <span className="text-[10px] font-mono uppercase bg-neutral-900 text-white px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> PIN Locked
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase bg-emerald-600 text-white px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <Unlock className="w-2.5 h-2.5" /> Public
                        </span>
                      )}
                      {video.videoUrl && (
                        <span className="text-[10px] font-mono uppercase bg-blue-600 text-white px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <Film className="w-2.5 h-2.5" /> Cloudinary Stream
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      {video.duration}
                    </span>

                    {/* Quick Preview Hover Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveVideo(video)}
                        className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Preview Session</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-serif text-base font-bold text-neutral-950 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {video.description}
                    </p>
                    {video.clinicalRationale && (
                      <p className="text-[11px] text-neutral-500 italic line-clamp-1">
                        Rationale: {video.clinicalRationale}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 font-mono">
                    ID: {video.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateIntervention(video.id, { isRestricted: !video.isRestricted })}
                      className="text-xs font-semibold text-neutral-700 hover:text-black underline"
                    >
                      {video.isRestricted ? 'Make Public' : 'Require PIN'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteIntervention(video.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete Intervention"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ARTICLES & PSYCHOEDUCATION CMS */}
      {/* ========================================================================= */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-neutral-950">
                Psychoeducational Articles & Patient Guides
              </h2>
              <p className="text-xs text-neutral-500">
                Publish articles on anxiety, panic regulation, hypnotherapy mechanisms, and insomnia sleep hygiene.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddArticleModal(true)}
              className="px-4 py-2 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl border border-neutral-200 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-neutral-400 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-mono uppercase font-bold text-neutral-800">{article.category}</span>
                    <span>{article.publishedDate} · {article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-neutral-950">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>Author: {article.author}</span>
                  <span className="text-[10px] font-mono">ID: {article.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: NOTIFICATION & BROADCAST CENTER */}
      {/* ========================================================================= */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Send Broadcast */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-neutral-800" />
                <span>Broadcast Patient Notice</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Send an immediate clinical alert, schedule update, or wellness reminder to all registered patients.
              </p>
            </div>

            {broadcastSent && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Clinical broadcast sent successfully!</span>
              </div>
            )}

            <form onSubmit={handleBroadcast} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Notice Headline *
                </label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. In-Clinic Schedule Update for Saturday"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  placeholder="e.g. Please be advised that Dr. Malik Sayar will conduct in-clinic consultations at Tak Mohalla Road from 10:00 AM."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast to Patients</span>
              </button>
            </form>
          </div>

          {/* Notification History */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-neutral-900">
              Notification Dispatch History
            </h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3.5 rounded-lg border border-neutral-200 space-y-1 hover:border-neutral-400 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900">{notif.title}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">{notif.date}</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {notif.message}
                  </p>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    Target: {notif.userId} · Status: {notif.read ? 'Read' : 'Unread'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: DOCTOR & CLINIC PRACTICE PROFILE */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase bg-neutral-100 text-neutral-800 px-2.5 py-0.5 rounded font-bold">
                Doctor Administration
              </span>
              <h2 className="font-serif text-2xl font-bold text-neutral-950 mt-1">
                Doctor Profile & Practice Information
              </h2>
              <p className="text-xs text-neutral-500">
                Update clinical credentials, consultation helpline, and Bijbehara clinic timings.
              </p>
            </div>
          </div>

          {docProfileSaved && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Doctor and clinic profile updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveDocProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1.5">
                  Doctor / Consultant Name *
                </label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1.5">
                  Direct Phone (WhatsApp Enabled) *
                </label>
                <input
                  type="tel"
                  required
                  value={docPhone}
                  onChange={(e) => setDocPhone(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1.5">
                  Official Consultation Email *
                </label>
                <input
                  type="email"
                  required
                  value={docEmail}
                  onChange={(e) => setDocEmail(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1.5">
                  Practice Timings
                </label>
                <input
                  type="text"
                  value={clinicHours}
                  onChange={(e) => setClinicHours(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1.5">
                Physical Clinic Address
              </label>
              <input
                type="text"
                value={clinicAddress}
                onChange={(e) => setClinicAddress(e.target.value)}
                className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
              />
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-600 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span>Admin Authority:</span>
                <span className="font-bold text-neutral-900">Dr. Malik Sayar (Full Administrative Rights)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Portal Permissions:</span>
                <span className="text-emerald-700 font-semibold">✓ Appointments, Videos, PINs, Articles & Patient View</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-xs"
            >
              Save Doctor & Practice Profile
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD IN-CLINIC APPOINTMENT */}
      {/* ========================================================================= */}
      {showAddAptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-neutral-200 shadow-2xl p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-neutral-950">
                Book Consultation (Doctor Manual Entry)
              </h3>
              <button
                type="button"
                onClick={() => setShowAddAptModal(false)}
                className="text-neutral-400 hover:text-black"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAppointment} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAptName}
                    onChange={(e) => setNewAptName(e.target.value)}
                    placeholder="Patient name"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newAptPhone}
                    onChange={(e) => setNewAptPhone(e.target.value)}
                    placeholder="+91 6005754205"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Service
                  </label>
                  <select
                    value={newAptService}
                    onChange={(e) => setNewAptService(e.target.value as any)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  >
                    <option value="Psychotherapy">Psychotherapy</option>
                    <option value="Clinical Hypnotherapy">Clinical Hypnotherapy</option>
                    <option value="Mental Health & Wellbeing">Mental Health & Wellbeing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Clinical Focus
                  </label>
                  <select
                    value={newAptTreatmentArea}
                    onChange={(e) => setNewAptTreatmentArea(e.target.value as any)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
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

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newAptType}
                    onChange={(e) => setNewAptType(e.target.value as any)}
                    className="w-full px-2 py-2 border border-neutral-300 rounded-lg text-xs"
                  >
                    <option value="offline">In-Clinic</option>
                    <option value="online">Online</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newAptDate}
                    onChange={(e) => setNewAptDate(e.target.value)}
                    className="w-full px-2 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Slot Time
                  </label>
                  <input
                    type="text"
                    value={newAptTimeSlot}
                    onChange={(e) => setNewAptTimeSlot(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full px-2 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                  Clinical Notes
                </label>
                <input
                  type="text"
                  value={newAptNotes}
                  onChange={(e) => setNewAptNotes(e.target.value)}
                  placeholder="Intake assessment or follow-up notes"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAptModal(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD INTERVENTION VIDEO (CLOUDINARY UPLOAD) */}
      {/* ========================================================================= */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-neutral-200 shadow-2xl p-6 space-y-4 animate-in fade-in max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-950 flex items-center gap-2">
                  <Film className="w-5 h-5 text-blue-600" />
                  <span>Upload & Prescribe Intervention Video</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Doctor video uploaded directly to Cloudinary and locked for patient PIN access.
                </p>
              </div>
              <button
                type="button"
                onClick={resetVideoForm}
                className="text-neutral-400 hover:text-black p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Cloudinary Video Dropzone & Upload State */}
            <div className="space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                Session Video File (Cloudinary CDN)
              </label>

              {/* State 1: Uploading in Progress */}
              {isUploadingVideo && (
                <div className="p-5 border-2 border-dashed border-blue-400 bg-blue-50/60 rounded-xl space-y-3 text-center animate-in fade-in">
                  <div className="flex items-center justify-center gap-2 text-blue-700 font-semibold text-xs">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Uploading Video to Cloudinary CDN... {videoUploadProgress}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${videoUploadProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-blue-600 font-mono">
                    {videoFile?.name} · {(Number(videoFile?.size || 0) / (1024 * 1024)).toFixed(1)} MB
                  </p>
                </div>
              )}

              {/* State 2: Upload Succeeded */}
              {!isUploadingVideo && uploadedVideoUrl && (
                <div className="p-4 border border-emerald-300 bg-emerald-50/60 rounded-xl space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Uploaded to Cloudinary Successfully!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedVideoUrl('');
                        setUploadedThumbnailUrl('');
                        setVideoFile(null);
                      }}
                      className="text-[11px] text-red-600 hover:text-red-800 font-semibold underline"
                    >
                      Remove / Re-upload
                    </button>
                  </div>

                  {/* Video preview thumbnail & stream badge */}
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-emerald-200">
                    {uploadedThumbnailUrl ? (
                      <img
                        src={uploadedThumbnailUrl}
                        alt="Preview"
                        className="w-16 h-12 object-cover rounded bg-neutral-900 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-12 rounded bg-neutral-900 flex items-center justify-center text-white shrink-0">
                        <Film className="w-5 h-5 opacity-70" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-900 truncate">
                        {videoFile?.name || 'Uploaded Video Stream'}
                      </p>
                      <p className="text-[10px] text-neutral-500 font-mono truncate">
                        {uploadedVideoUrl}
                      </p>
                      <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded font-mono">
                        Auto-detected Duration: {newVideoDuration}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* State 3: Idle Dropzone */}
              {!isUploadingVideo && !uploadedVideoUrl && (
                <div className="space-y-2">
                  <label
                    htmlFor="cloudinary-video-input"
                    className="block p-6 border-2 border-dashed border-neutral-300 hover:border-black rounded-xl text-center cursor-pointer transition-colors bg-neutral-50/50 hover:bg-neutral-50 group"
                  >
                    <input
                      id="cloudinary-video-input"
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,video/mkv,video/*"
                      onChange={handleVideoFileSelect}
                      className="hidden"
                    />
                    <UploadCloud className="w-8 h-8 text-neutral-400 group-hover:text-black mx-auto mb-2 transition-colors" />
                    <p className="text-xs font-bold text-neutral-900">
                      Choose video file or drag and drop here
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      MP4, MOV, WebM, MKV · Automatically uploaded to Cloudinary
                    </p>

                    <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-white border border-neutral-200">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCloudinaryConfigured ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      <span>
                        {isCloudinaryConfigured
                          ? `Cloudinary Connected (${cloudinaryService.cloudName})`
                          : 'Simulation Preview Mode (Add keys to .env)'}
                      </span>
                    </div>
                  </label>

                  {videoUploadError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{videoUploadError}</span>
                    </div>
                  )}

                  {/* Optional: Direct URL fallback */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setShowManualUrlInput(!showManualUrlInput)}
                      className="text-[11px] text-neutral-500 hover:text-black font-medium underline"
                    >
                      {showManualUrlInput ? 'Hide URL field' : 'Or paste direct video/Cloudinary link'}
                    </button>
                  </div>

                  {showManualUrlInput && (
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-neutral-600">
                        Direct Video Stream URL
                      </label>
                      <input
                        type="url"
                        value={manualVideoUrl}
                        onChange={(e) => setManualVideoUrl(e.target.value)}
                        placeholder="https://res.cloudinary.com/your-cloud/video/upload/session.mp4"
                        className="w-full px-3 py-1.5 border border-neutral-300 rounded text-xs font-mono"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <form onSubmit={handleAddVideo} className="space-y-3 pt-2 border-t border-neutral-200">
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                  Session Title *
                </label>
                <input
                  type="text"
                  required
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  placeholder="e.g. Diaphragmatic Nervous System Reset"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Therapy Category
                  </label>
                  <select
                    value={newVideoCategory}
                    onChange={(e) => setNewVideoCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  >
                    <option value="CBT">CBT</option>
                    <option value="Mindfulness & Relaxation">Mindfulness & Relaxation</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="Hypnotherapy">Hypnotherapy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newVideoDuration}
                    onChange={(e) => setNewVideoDuration(e.target.value)}
                    placeholder="15 mins"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  >
                  </input>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Clinical Focus Area
                  </label>
                  <select
                    value={newVideoTreatmentArea}
                    onChange={(e) => setNewVideoTreatmentArea(e.target.value as any)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  >
                    <option value="Anxiety">Anxiety</option>
                    <option value="Depression">Depression</option>
                    <option value="OCD">OCD</option>
                    <option value="Overthinking">Overthinking</option>
                    <option value="Fear & Phobias">Fear & Phobias</option>
                    <option value="Sleep Problems">Sleep Problems</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                    Access Level
                  </label>
                  <select
                    value={newVideoIsRestricted ? 'restricted' : 'public'}
                    onChange={(e) => setNewVideoIsRestricted(e.target.value === 'restricted')}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  >
                    <option value="restricted">PIN Restricted (Doctor Prescribed)</option>
                    <option value="public">Public (Freely accessible)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                  Typically Prescribed For
                </label>
                <input
                  type="text"
                  value={newVideoAssignedFor}
                  onChange={(e) => setNewVideoAssignedFor(e.target.value)}
                  placeholder="e.g. Acute somatic anxiety, panic sensations, vagal tone regulation"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                  Description & Guidance
                </label>
                <textarea
                  rows={2}
                  value={newVideoDesc}
                  onChange={(e) => setNewVideoDesc(e.target.value)}
                  placeholder="Clinical instructions for the patient when watching and practicing"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                  Clinical Rationale (Why prescribed)
                </label>
                <input
                  type="text"
                  value={newVideoRationale}
                  onChange={(e) => setNewVideoRationale(e.target.value)}
                  placeholder="Stimulates parasympathetic vagal tone and downregulates panic"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={resetVideoForm}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold hover:border-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingVideo}
                  className="px-5 py-2 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
                >
                  {isUploadingVideo ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Intervention & Video</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: WRITE ARTICLE */}
      {/* ========================================================================= */}
      {showAddArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-neutral-200 shadow-2xl p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-neutral-950">
                Write Psychoeducational Article
              </h3>
              <button
                type="button"
                onClick={() => setShowAddArticleModal(false)}
                className="text-neutral-400 hover:text-black"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddArticle} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  placeholder="e.g. Somatic Grounding Techniques for Acute Anxiety"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                  Category
                </label>
                <select
                  value={newArticleCategory}
                  onChange={(e) => setNewArticleCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                >
                  <option value="Anxiety & Panic">Anxiety & Panic</option>
                  <option value="Clinical Hypnotherapy">Clinical Hypnotherapy</option>
                  <option value="Sleep & Insomnia">Sleep & Insomnia</option>
                  <option value="CBT Mindset">CBT Mindset</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={newArticleSummary}
                  onChange={(e) => setNewArticleSummary(e.target.value)}
                  placeholder="Brief 1-2 sentence overview for patient preview card"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 mb-1">
                  Article Body Text
                </label>
                <textarea
                  rows={4}
                  value={newArticleBody}
                  onChange={(e) => setNewArticleBody(e.target.value)}
                  placeholder="Clinical guidance, explanations, and advice for clients"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddArticleModal(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
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
