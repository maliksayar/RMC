import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  isUserAdmin,
  InterventionVideo,
  AccessPin,
  Appointment,
  BlogArticle,
  SystemNotification
} from '../types';
import {
  INITIAL_INTERVENTIONS,
  INITIAL_PINS,
  INITIAL_APPOINTMENTS,
  INITIAL_ARTICLES,
  DEMO_USERS
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { dbService } from '../lib/supabaseService';
import { authService, SignUpData } from '../lib/authService';

interface AppContextType {
  currentUser: User | null;
  role: UserRole;
  isAdmin: boolean;
  isSupabaseLive: boolean;
  switchRole: (role: UserRole) => void;
  updateUserProfile: (updates: Partial<User>) => Promise<boolean>;
  loginAs: (user: User) => void;
  loginWithSupabase: (email: string, password: string) => Promise<{ success: boolean; message?: string; role?: UserRole }>;
  signUpWithSupabase: (data: SignUpData) => Promise<{ success: boolean; message?: string; role?: UserRole; autoLoggedIn?: boolean }>;
  logout: () => void;

  // Interventions
  interventions: InterventionVideo[];
  unlockedVideoIds: string[];
  addIntervention: (video: Omit<InterventionVideo, 'id'>) => void;
  updateIntervention: (id: string, updates: Partial<InterventionVideo>) => void;
  deleteIntervention: (id: string) => void;

  // PINs
  pins: AccessPin[];
  activeUnlockedPin: AccessPin | null;
  verifyAndUnlockPin: (code: string) => { success: boolean; message: string; pin?: AccessPin };
  generatePin: (patientName: string, assignedVideoIds: string[], expiryDays?: number, notes?: string) => AccessPin;
  revokePin: (pinId: string) => void;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  deleteAppointment: (id: string) => void;

  // Articles
  articles: BlogArticle[];
  publishArticle: (article: Omit<BlogArticle, 'id' | 'publishedDate'>) => void;
  deleteArticle: (id: string) => void;

  // Notifications
  notifications: SystemNotification[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  broadcastNotification: (title: string, message: string, targetUserId?: string) => void;

  // Global Modals State
  pinModalOpen: boolean;
  setPinModalOpen: (open: boolean) => void;
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  activeVideo: InterventionVideo | null;
  setActiveVideo: (video: InterventionVideo | null) => void;
  activeArticle: BlogArticle | null;
  setActiveArticle: (article: BlogArticle | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Dummy/static IDs to permanently purge so all appointments, videos, and articles are dynamic doctor uploads
const DUMMY_APPOINTMENT_IDS = new Set(['APT-1082', 'APT-1083', 'APT-1084']);
const DUMMY_VIDEO_IDS = new Set([
  'diaphragmatic-breathing',
  'grounding-54321',
  'progressive-muscle-relaxation',
  'cognitive-restructuring',
  'erp-ocd',
  'self-hypnosis-induction',
  'edu-what-is-anxiety',
  'edu-what-is-panic',
  'edu-what-is-psychotherapy',
  'edu-what-is-cbt',
  'edu-what-is-hypnotherapy',
  'edu-what-is-dissociation',
  'edu-when-to-consider-help'
]);
const DUMMY_ARTICLE_IDS = new Set([
  'art-1',
  'art-2',
  'understanding-overthinking-cbt',
  'science-of-clinical-hypnotherapy',
  'restoring-sleep-cbt-insomnia'
]);
const DUMMY_PIN_IDS = new Set(['pin-1', 'pin-2', 'pin-3', 'pin-demo-1']);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user & role (defaults to null if unauthenticated)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rmc_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed?.id === 'patient-demo-1' ||
          parsed?.email === 'patient@realitymindclinic.com' ||
          parsed?.name?.includes('Aamir Mir')
        ) {
          localStorage.removeItem('rmc_current_user');
          return null;
        }
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  });

  const isAdmin = isUserAdmin(currentUser);
  const role: UserRole = isAdmin ? 'admin' : (currentUser?.role || 'patient');
  const isSupabaseLive = isSupabaseConfigured;

  // Interventions library (Dynamic doctor uploads)
  const [interventions, setInterventions] = useState<InterventionVideo[]>(() => {
    const saved = localStorage.getItem('rmc_interventions');
    if (saved) {
      try {
        const parsed: InterventionVideo[] = JSON.parse(saved);
        return parsed.filter((v) => !DUMMY_VIDEO_IDS.has(v.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // PINs (Dynamic doctor keys)
  const [pins, setPins] = useState<AccessPin[]>(() => {
    const saved = localStorage.getItem('rmc_pins');
    if (saved) {
      try {
        const parsed: AccessPin[] = JSON.parse(saved);
        return parsed.filter((p) => !DUMMY_PIN_IDS.has(p.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Active unlocked PIN
  const [activeUnlockedPin, setActiveUnlockedPin] = useState<AccessPin | null>(() => {
    const saved = localStorage.getItem('rmc_active_pin');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && !DUMMY_PIN_IDS.has(parsed.id)) return parsed;
      } catch (e) {}
    }
    return null;
  });

  // Unlocked video IDs
  const [unlockedVideoIds, setUnlockedVideoIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('rmc_unlocked_videos');
    if (saved) {
      try {
        const parsed: string[] = JSON.parse(saved);
        return parsed.filter((id) => !DUMMY_VIDEO_IDS.has(id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Appointments (Dynamic patient bookings & doctor roster)
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('rmc_appointments');
    if (saved) {
      try {
        const parsed: Appointment[] = JSON.parse(saved);
        return parsed.filter((apt) => !DUMMY_APPOINTMENT_IDS.has(apt.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Articles (Dynamic doctor psychoeducation)
  const [articles, setArticles] = useState<BlogArticle[]>(() => {
    const saved = localStorage.getItem('rmc_articles');
    if (saved) {
      try {
        const parsed: BlogArticle[] = JSON.parse(saved);
        return parsed.filter((a) => !DUMMY_ARTICLE_IDS.has(a.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Notifications
  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    return [
      {
        id: 'notif-1',
        userId: 'patient-demo-1',
        title: 'Intervention Access Active',
        message: 'Your Psychologist assigned 4 clinical exercises via PIN RMC-2026.',
        date: 'Today',
        read: false,
        type: 'pin'
      },
      {
        id: 'notif-2',
        userId: 'patient-demo-1',
        title: 'Appointment Reminder',
        message: 'In-clinic consultation scheduled at Tak Mohalla Road, Bijbehara.',
        date: 'Yesterday',
        read: false,
        type: 'appointment'
      }
    ];
  });

  // Modal states
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [activeVideo, setActiveVideo] = useState<InterventionVideo | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rmc_current_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rmc_interventions', JSON.stringify(interventions));
  }, [interventions]);

  useEffect(() => {
    localStorage.setItem('rmc_pins', JSON.stringify(pins));
  }, [pins]);

  useEffect(() => {
    localStorage.setItem('rmc_active_pin', JSON.stringify(activeUnlockedPin));
  }, [activeUnlockedPin]);

  useEffect(() => {
    localStorage.setItem('rmc_unlocked_videos', JSON.stringify(unlockedVideoIds));
  }, [unlockedVideoIds]);

  useEffect(() => {
    localStorage.setItem('rmc_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('rmc_articles', JSON.stringify(articles));
  }, [articles]);

  // ==========================================
  // INITIALIZE SUPABASE SESSION & DATABASE SYNC
  // ==========================================
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // 1. Initial auth listener & session restore
    const restoreSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const profile = await dbService.getProfile(session.user.id);
          const emailLower = (session.user.email || '').toLowerCase().trim();
          const fallbackRole: UserRole =
            (session.user.user_metadata?.role as UserRole) ||
            (emailLower === 'realitymindclinic@gmail.com' || emailLower === 'doctor@realitymindclinic.com'
              ? 'admin'
              : 'patient');
          const resolvedRole: UserRole = profile?.role || fallbackRole;

          const activeUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            name:
              profile?.name ||
              session.user.user_metadata?.name ||
              (session.user.email ? session.user.email.split('@')[0] : 'User'),
            phone: profile?.phone || session.user.user_metadata?.phone || '',
            role: resolvedRole,
            avatar: profile?.avatar,
            createdAt: profile?.createdAt || session.user.created_at || new Date().toISOString(),
            unlockedVideoIds: profile?.unlockedVideoIds || []
          };

          setCurrentUser(activeUser);
          localStorage.setItem('rmc_current_user', JSON.stringify(activeUser));

          if (activeUser.role === 'admin' || activeUser.role === 'psychologist') {
            setUnlockedVideoIds(interventions.map((v) => v.id));
          } else if (activeUser.unlockedVideoIds && activeUser.unlockedVideoIds.length > 0) {
            setUnlockedVideoIds(activeUser.unlockedVideoIds);
          }
        } else {
          // If Supabase has no active session, restore whatever authenticated user is cached in localStorage
          const saved = localStorage.getItem('rmc_current_user');
          if (saved) {
            try {
              const parsed: User = JSON.parse(saved);
              if (parsed && parsed.email) {
                setCurrentUser(parsed);
                if (isUserAdmin(parsed)) {
                  setUnlockedVideoIds(interventions.map((v) => v.id));
                } else if (parsed.unlockedVideoIds && parsed.unlockedVideoIds.length > 0) {
                  setUnlockedVideoIds(parsed.unlockedVideoIds);
                }
              }
            } catch (e) {
              console.warn('Could not restore cached session:', e);
            }
          }
        }
      } catch (err) {
        console.warn('Supabase session load error:', err);
      }
    };

    restoreSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await dbService.getProfile(session.user.id);
        const emailLower = (session.user.email || '').toLowerCase().trim();
        const fallbackRole: UserRole =
          (session.user.user_metadata?.role as UserRole) ||
          (emailLower === 'realitymindclinic@gmail.com' || emailLower === 'doctor@realitymindclinic.com'
            ? 'admin'
            : 'patient');
        const resolvedRole: UserRole = profile?.role || fallbackRole;

        const activeUser: User = {
          id: session.user.id,
          email: session.user.email || '',
          name:
            profile?.name ||
            session.user.user_metadata?.name ||
            (session.user.email ? session.user.email.split('@')[0] : 'User'),
          phone: profile?.phone || session.user.user_metadata?.phone || '',
          role: resolvedRole,
          avatar: profile?.avatar,
          createdAt: profile?.createdAt || session.user.created_at || new Date().toISOString(),
          unlockedVideoIds: profile?.unlockedVideoIds || []
        };

        setCurrentUser(activeUser);
        localStorage.setItem('rmc_current_user', JSON.stringify(activeUser));

        if (activeUser.role === 'admin' || activeUser.role === 'psychologist') {
          setUnlockedVideoIds(interventions.map((v) => v.id));
        } else if (activeUser.unlockedVideoIds && activeUser.unlockedVideoIds.length > 0) {
          setUnlockedVideoIds(activeUser.unlockedVideoIds);
        }
      } else if (event === 'SIGNED_OUT') {
        // If explicit sign out event, check if current user is an active direct/offline admin
        const saved = localStorage.getItem('rmc_current_user');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const emailLower = (parsed?.email || '').toLowerCase().trim();
            if (emailLower === 'realitymindclinic@gmail.com' || emailLower === 'doctor@realitymindclinic.com') {
              return;
            }
          } catch {}
        }
        setCurrentUser(null);
        localStorage.removeItem('rmc_current_user');
        localStorage.removeItem('rmc_active_pin');
        setUnlockedVideoIds([]);
      }
    });

    // 2. Fetch data from Supabase DB
    const loadSupabaseData = async () => {
      try {
        const [dbInterventions, dbAppointments, dbPins, dbArticles, dbNotifications] = await Promise.all([
          dbService.getInterventions(),
          dbService.getAppointments(),
          dbService.getPins(),
          dbService.getArticles(),
          dbService.getNotifications()
        ]);

        if (dbInterventions !== null) {
          const cleanInterventions = dbInterventions.filter((v) => !DUMMY_VIDEO_IDS.has(v.id));
          const serverIdSet = new Set(cleanInterventions.map((v) => v.id));

          // Rescue & sync any local videos in localStorage that are not on the server yet
          const savedLocal = localStorage.getItem('rmc_interventions');
          let localVideos: InterventionVideo[] = [];
          if (savedLocal) {
            try {
              localVideos = JSON.parse(savedLocal);
            } catch {}
          }

          const unsyncedLocal = localVideos.filter(
            (v) => !serverIdSet.has(v.id) && !DUMMY_VIDEO_IDS.has(v.id) && v.title
          );

          // Push unsynced local videos from this device to Supabase so other devices receive them
          if (unsyncedLocal.length > 0) {
            unsyncedLocal.forEach((v) => {
              dbService.createIntervention(v).catch(console.warn);
            });
          }

          const merged = [...cleanInterventions, ...unsyncedLocal];
          setInterventions(merged);
        }
        if (dbAppointments !== null) {
          const cleanAppointments = dbAppointments.filter((a) => !DUMMY_APPOINTMENT_IDS.has(a.id));
          setAppointments((prev) => {
            const serverIds = new Set(cleanAppointments.map((a) => a.id));
            const localOnly = prev.filter((a) => !serverIds.has(a.id) && !DUMMY_APPOINTMENT_IDS.has(a.id));
            return [...cleanAppointments, ...localOnly];
          });
        }
        if (dbPins !== null) {
          const cleanPins = dbPins.filter((p) => !DUMMY_PIN_IDS.has(p.id));
          setPins(cleanPins);
        }
        if (dbArticles !== null) {
          const cleanArticles = dbArticles.filter((a) => !DUMMY_ARTICLE_IDS.has(a.id));
          setArticles(cleanArticles);
        }
        if (dbNotifications && dbNotifications.length > 0) {
          setNotifications(dbNotifications);
        }
      } catch (e) {
        console.warn('Failed loading data from Supabase tables:', e);
      }
    };

    loadSupabaseData();

    // 3. Realtime subscription: sync videos dynamically across all devices
    const channel = supabase
      .channel('public:interventions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'interventions' },
        async () => {
          const fresh = await dbService.getInterventions();
          if (fresh) {
            setInterventions(fresh.filter((v) => !DUMMY_VIDEO_IDS.has(v.id)));
          }
        }
      )
      .subscribe();

    return () => {
      authListener?.subscription?.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);

  const switchRole = (newRole: UserRole) => {
    if (currentUser) {
      const updated: User = {
        ...currentUser,
        role: newRole
      };
      setCurrentUser(updated);
      localStorage.setItem('rmc_current_user', JSON.stringify(updated));
      if (newRole === 'admin' || newRole === 'psychologist') {
        setUnlockedVideoIds(interventions.map((v) => v.id));
      }
    } else {
      if (newRole === 'admin' || newRole === 'psychologist') {
        setCurrentUser(DEMO_USERS[0]);
        setUnlockedVideoIds(interventions.map((v) => v.id));
      }
    }
  };

  const updateUserProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!currentUser) return false;
    const updated: User = {
      ...currentUser,
      ...updates
    };
    setCurrentUser(updated);
    localStorage.setItem('rmc_current_user', JSON.stringify(updated));

    if (isSupabaseConfigured && currentUser.id) {
      try {
        await dbService.updateProfile(currentUser.id, updates);
      } catch (e) {
        console.warn('Could not sync profile update to Supabase:', e);
      }
    }
    return true;
  };

  const loginAs = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('rmc_current_user', JSON.stringify(user));
    if (isUserAdmin(user)) {
      setUnlockedVideoIds(interventions.map((v) => v.id));
    } else if (user.unlockedVideoIds && user.unlockedVideoIds.length > 0) {
      setUnlockedVideoIds(user.unlockedVideoIds);
    }
  };

  const loginWithSupabase = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; message?: string; role?: UserRole; user?: User }> => {
    if (!isSupabaseConfigured) {
      return { success: false, message: 'Supabase credentials are not configured in .env yet.' };
    }
    try {
      const res = await authService.signIn(email, pass);
      if (res?.user) {
        const profile = await dbService.getProfile(res.user.id);
        const emailLower = (res.user.email || email).toLowerCase().trim();
        const fallbackRole: UserRole =
          (res.user.user_metadata?.role as UserRole) ||
          (emailLower === 'realitymindclinic@gmail.com' || emailLower === 'doctor@realitymindclinic.com'
            ? 'admin'
            : 'patient');
        const resolvedRole: UserRole = profile?.role || fallbackRole;

        const resolvedUser: User = {
          id: res.user.id,
          email: res.user.email || email,
          name:
            profile?.name ||
            res.user.user_metadata?.name ||
            (res.user.email ? res.user.email.split('@')[0] : 'User'),
          phone: profile?.phone || res.user.user_metadata?.phone || '',
          role: resolvedRole,
          avatar: profile?.avatar,
          createdAt: profile?.createdAt || res.user.created_at || new Date().toISOString(),
          unlockedVideoIds: profile?.unlockedVideoIds || []
        };

        setCurrentUser(resolvedUser);
        localStorage.setItem('rmc_current_user', JSON.stringify(resolvedUser));

        if (resolvedUser.role === 'admin' || resolvedUser.role === 'psychologist') {
          setUnlockedVideoIds(interventions.map((v) => v.id));
        } else if (resolvedUser.unlockedVideoIds && resolvedUser.unlockedVideoIds.length > 0) {
          setUnlockedVideoIds(resolvedUser.unlockedVideoIds);
        }

        return { success: true, role: resolvedUser.role, user: resolvedUser };
      }
      return { success: false, message: 'Could not log in with given credentials.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Login error occurred.' };
    }
  };

  const signUpWithSupabase = async (
    data: SignUpData
  ): Promise<{ success: boolean; message?: string; role?: UserRole; autoLoggedIn?: boolean; user?: User }> => {
    if (!isSupabaseConfigured) {
      return { success: false, message: 'Supabase credentials are not configured in .env yet.' };
    }
    try {
      const emailLower = data.email.toLowerCase().trim();
      const isDoc =
        emailLower === 'realitymindclinic@gmail.com' ||
        emailLower === 'doctor@realitymindclinic.com';
      const finalRole: UserRole = isDoc ? 'admin' : 'patient';

      const res = await authService.signUp({
        ...data,
        role: finalRole
      });

      if (res?.user) {
        const newUser: User = {
          id: res.user.id,
          email: data.email,
          name: data.name,
          phone: data.phone || '',
          role: finalRole,
          createdAt: res.user.created_at || new Date().toISOString(),
          unlockedVideoIds: []
        };

        if (res.session) {
          setCurrentUser(newUser);
          localStorage.setItem('rmc_current_user', JSON.stringify(newUser));
          if (finalRole === 'admin') {
            setUnlockedVideoIds(interventions.map((v) => v.id));
          }
          return {
            success: true,
            autoLoggedIn: true,
            role: finalRole,
            user: newUser,
            message: `Account created successfully as ${finalRole === 'admin' ? 'Doctor / Admin' : 'Patient'}!`
          };
        }

        return {
          success: true,
          autoLoggedIn: false,
          role: finalRole,
          message: 'Account registered! Please check your email to verify your address, then sign in.'
        };
      }
      return { success: false, message: 'Could not complete registration.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Registration error occurred.' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      try {
        await authService.signOut();
      } catch (e) {
        console.warn('Sign out error:', e);
      }
    }
    setCurrentUser(null);
    localStorage.removeItem('rmc_current_user');
    localStorage.removeItem('rmc_active_pin');
    setUnlockedVideoIds([]);
    setActiveUnlockedPin(null);
  };

  // Verify PIN logic
  const verifyAndUnlockPin = (
    code: string
  ): { success: boolean; message: string; pin?: AccessPin } => {
    const cleanCode = code.trim().toUpperCase();
    const pin = pins.find((p) => p.code.toUpperCase() === cleanCode);

    if (!pin) {
      return { success: false, message: 'Invalid PIN code. Please verify with your Psychologist.' };
    }

    if (pin.status === 'revoked') {
      return { success: false, message: 'This access PIN has been revoked by the Psychologist.' };
    }

    const expiryDate = new Date(pin.expiresAt);
    if (expiryDate < new Date()) {
      return { success: false, message: 'This PIN has expired. Please contact the clinic for a refreshed code.' };
    }

    // Success! Unlock videos
    setActiveUnlockedPin(pin);
    const updatedUnlocked = Array.from(new Set([...unlockedVideoIds, ...pin.assignedVideoIds]));
    setUnlockedVideoIds(updatedUnlocked);

    // If user is logged in, sync unlocked IDs to their profile in Supabase DB
    if (currentUser?.id && isSupabaseConfigured) {
      dbService.updateProfile(currentUser.id, {
        unlockedVideoIds: updatedUnlocked
      }).catch(console.warn);
    }

    // Add alert notification
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      title: 'Intervention Library Unlocked',
      message: `Access granted for ${pin.assignedVideoIds.length} private clinical videos under PIN ${pin.code}.`,
      date: 'Just now',
      read: false,
      type: 'pin'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    if (isSupabaseConfigured) {
      dbService.createNotification(newNotif).catch(console.warn);
    }

    return {
      success: true,
      message: `PIN accepted! ${pin.assignedVideoIds.length} prescribed intervention sessions unlocked.`,
      pin
    };
  };

  // Generate PIN (Psychologist function)
  const generatePin = (
    patientName: string,
    assignedVideoIds: string[],
    expiryDays: number = 30,
    notes?: string
  ): AccessPin => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `RMC-${randomSuffix}`;
    const now = new Date();
    const expiry = new Date();
    expiry.setDate(now.getDate() + expiryDays);

    const newPin: AccessPin = {
      id: `pin-${Date.now()}`,
      code,
      patientId: `pat-${Date.now()}`,
      patientName,
      assignedVideoIds,
      createdAt: now.toISOString(),
      expiresAt: expiry.toISOString(),
      status: 'active',
      issuedBy: currentUser?.name || 'Dr. Psychologist (Bijbehara)',
      notes: notes || 'Assigned tailored clinical guidance'
    };

    setPins((prev) => [newPin, ...prev]);

    if (isSupabaseConfigured) {
      dbService.createPin(newPin).catch(console.warn);
    }

    return newPin;
  };

  const revokePin = (pinId: string) => {
    setPins((prev) =>
      prev.map((p) => (p.id === pinId ? { ...p, status: 'revoked' as const } : p))
    );

    if (isSupabaseConfigured) {
      dbService.updatePinStatus(pinId, 'revoked').catch(console.warn);
    }
  };

  // Book appointment
  const bookAppointment = (
    appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>
  ): Appointment => {
    const newApt: Appointment = {
      ...appointmentData,
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    setAppointments((prev) => [newApt, ...prev]);

    // Send notification to patient & doctor
    const notif: SystemNotification = {
      id: `notif-${Date.now()}`,
      userId: newApt.patientId,
      title: 'Appointment Confirmed',
      message: `Your ${newApt.service} (${newApt.type === 'offline' ? 'In-Clinic at Tak Mohalla Road' : 'Online Call'}) on ${newApt.date} at ${newApt.timeSlot} is confirmed with Yehya Hassan.`,
      date: 'Just now',
      read: false,
      type: 'appointment'
    };

    const adminNotif: SystemNotification = {
      id: `notif-doc-${Date.now()}`,
      userId: '32d5ebbd-476a-4199-b9fe-4c2410ffa230',
      title: 'New Patient Booking',
      message: `New booking: ${newApt.patientName} (${newApt.patientPhone}) for ${newApt.date} at ${newApt.timeSlot}.`,
      date: 'Just now',
      read: false,
      type: 'appointment'
    };

    setNotifications((prev) => [adminNotif, notif, ...prev]);

    // Sync to Supabase DB
    if (isSupabaseConfigured) {
      dbService.createAppointment(newApt).catch(console.warn);
      dbService.createNotification(notif).catch(console.warn);
      dbService.createNotification(adminNotif).catch(console.warn);
    }

    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );

    if (isSupabaseConfigured) {
      dbService.updateAppointmentStatus(id, status).catch(console.warn);
    }
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    if (isSupabaseConfigured) {
      dbService.deleteAppointment(id).catch(console.warn);
    }
  };

  // Interventions library management
  const addIntervention = async (videoData: Omit<InterventionVideo, 'id'>) => {
    const newVideo: InterventionVideo = {
      ...videoData,
      id: `video-${Date.now()}`
    };
    setInterventions((prev) => [newVideo, ...prev.filter((v) => v.id !== newVideo.id)]);

    if (isSupabaseConfigured) {
      await dbService.createIntervention(newVideo);
    }
  };

  const updateIntervention = async (id: string, updates: Partial<InterventionVideo>) => {
    setInterventions((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );

    if (isSupabaseConfigured) {
      await dbService.updateIntervention(id, updates);
    }
  };

  const deleteIntervention = async (id: string) => {
    setInterventions((prev) => prev.filter((v) => v.id !== id));

    if (isSupabaseConfigured) {
      await dbService.deleteIntervention(id);
    }
  };

  // Articles
  const publishArticle = (articleData: Omit<BlogArticle, 'id' | 'publishedDate'>) => {
    const newArticle: BlogArticle = {
      ...articleData,
      id: `art-${Date.now()}`,
      publishedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    setArticles((prev) => [newArticle, ...prev]);

    if (isSupabaseConfigured) {
      dbService.createArticle(newArticle).catch(console.warn);
    }
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((art) => art.id !== id));
    if (isSupabaseConfigured) {
      dbService.deleteArticle(id).catch(console.warn);
    }
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

    if (isSupabaseConfigured) {
      dbService.markNotificationRead(id).catch(console.warn);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const broadcastNotification = (title: string, message: string, targetUserId: string = 'all') => {
    const notif: SystemNotification = {
      id: `notif-${Date.now()}`,
      userId: targetUserId,
      title,
      message,
      date: 'Just now',
      read: false,
      type: 'system'
    };
    setNotifications((prev) => [notif, ...prev]);

    if (isSupabaseConfigured) {
      dbService.createNotification(notif).catch(console.warn);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        role,
        isAdmin,
        isSupabaseLive,
        switchRole,
        updateUserProfile,
        loginAs,
        loginWithSupabase,
        signUpWithSupabase,
        logout,
        interventions,
        unlockedVideoIds,
        addIntervention,
        updateIntervention,
        deleteIntervention,
        pins,
        activeUnlockedPin,
        verifyAndUnlockPin,
        generatePin,
        revokePin,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        articles,
        publishArticle,
        deleteArticle,
        notifications,
        markNotificationAsRead,
        clearNotifications,
        broadcastNotification,
        pinModalOpen,
        setPinModalOpen,
        bookingModalOpen,
        setBookingModalOpen,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        activeVideo,
        setActiveVideo,
        activeArticle,
        setActiveArticle
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
