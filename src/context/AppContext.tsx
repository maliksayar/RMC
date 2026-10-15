import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
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

  // Articles
  articles: BlogArticle[];
  publishArticle: (article: Omit<BlogArticle, 'id' | 'publishedDate'>) => void;

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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user & role
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rmc_current_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0]; // defaults to Patient Aamir Mir
  });

  const role: UserRole = currentUser?.role || 'patient';
  const isAdmin = role === 'admin' || role === 'psychologist';
  const isSupabaseLive = isSupabaseConfigured;

  // Interventions library
  const [interventions, setInterventions] = useState<InterventionVideo[]>(() => {
    const saved = localStorage.getItem('rmc_interventions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasEducational = parsed.some((v: any) => v.resourceKind === 'educational');
        if (!hasEducational) {
          const existingIds = new Set(parsed.map((v: any) => v.id));
          const additions = INITIAL_INTERVENTIONS.filter((v) => !existingIds.has(v.id));
          return [...parsed, ...additions];
        }
        return parsed;
      } catch (e) {
        return INITIAL_INTERVENTIONS;
      }
    }
    return INITIAL_INTERVENTIONS;
  });

  // PINs
  const [pins, setPins] = useState<AccessPin[]>(() => {
    const saved = localStorage.getItem('rmc_pins');
    return saved ? JSON.parse(saved) : INITIAL_PINS;
  });

  // Active unlocked PIN
  const [activeUnlockedPin, setActiveUnlockedPin] = useState<AccessPin | null>(() => {
    const saved = localStorage.getItem('rmc_active_pin');
    return saved ? JSON.parse(saved) : INITIAL_PINS[0];
  });

  // Unlocked video IDs
  const [unlockedVideoIds, setUnlockedVideoIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('rmc_unlocked_videos');
    if (saved) return JSON.parse(saved);
    return INITIAL_PINS[0].assignedVideoIds;
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('rmc_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Articles
  const [articles, setArticles] = useState<BlogArticle[]>(() => {
    const saved = localStorage.getItem('rmc_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
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
    localStorage.setItem('rmc_current_user', JSON.stringify(currentUser));
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
          const emailLower = (session.user.email || '').toLowerCase();
          const isDoc = emailLower.includes('doctor') || emailLower.includes('admin') || emailLower.includes('clinic');
          const resolvedRole: UserRole = profile?.role || (isDoc ? 'admin' : ((session.user.user_metadata?.role as UserRole) || 'patient'));

          const activeUser: User = profile || {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || (session.user.email ? session.user.email.split('@')[0] : 'User'),
            phone: session.user.user_metadata?.phone || '',
            role: resolvedRole,
            createdAt: session.user.created_at || new Date().toISOString(),
            unlockedVideoIds: []
          };

          setCurrentUser(activeUser);
          if (activeUser.role === 'admin' || activeUser.role === 'psychologist') {
            setUnlockedVideoIds(interventions.map((v) => v.id));
          } else if (activeUser.unlockedVideoIds && activeUser.unlockedVideoIds.length > 0) {
            setUnlockedVideoIds(activeUser.unlockedVideoIds);
          }
        }
      } catch (err) {
        console.warn('Supabase session load error:', err);
      }
    };

    restoreSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await dbService.getProfile(session.user.id);
        const emailLower = (session.user.email || '').toLowerCase();
        const isDoc = emailLower.includes('doctor') || emailLower.includes('admin') || emailLower.includes('clinic');
        const resolvedRole: UserRole = profile?.role || (isDoc ? 'admin' : ((session.user.user_metadata?.role as UserRole) || 'patient'));

        const activeUser: User = profile || {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || (session.user.email ? session.user.email.split('@')[0] : 'User'),
          phone: session.user.user_metadata?.phone || '',
          role: resolvedRole,
          createdAt: session.user.created_at || new Date().toISOString(),
          unlockedVideoIds: []
        };

        setCurrentUser(activeUser);
        if (activeUser.role === 'admin' || activeUser.role === 'psychologist') {
          setUnlockedVideoIds(interventions.map((v) => v.id));
        } else if (activeUser.unlockedVideoIds && activeUser.unlockedVideoIds.length > 0) {
          setUnlockedVideoIds(activeUser.unlockedVideoIds);
        }
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

        if (dbInterventions && dbInterventions.length > 0) {
          setInterventions(dbInterventions);
        }
        if (dbAppointments && dbAppointments.length > 0) {
          setAppointments(dbAppointments);
        }
        if (dbPins && dbPins.length > 0) {
          setPins(dbPins);
        }
        if (dbArticles && dbArticles.length > 0) {
          setArticles(dbArticles);
        }
        if (dbNotifications && dbNotifications.length > 0) {
          setNotifications(dbNotifications);
        }
      } catch (e) {
        console.warn('Failed loading data from Supabase tables:', e);
      }
    };

    loadSupabaseData();

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin' || newRole === 'psychologist') {
      setCurrentUser({
        ...DEMO_USERS[1],
        role: 'admin'
      });
      setUnlockedVideoIds(interventions.map((v) => v.id));
    } else {
      setCurrentUser(DEMO_USERS[0]);
      if (activeUnlockedPin) {
        setUnlockedVideoIds(activeUnlockedPin.assignedVideoIds);
      } else {
        setUnlockedVideoIds([]);
      }
    }
  };

  const loginAs = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin' || user.role === 'psychologist') {
      setUnlockedVideoIds(interventions.map((v) => v.id));
    } else if (user.unlockedVideoIds && user.unlockedVideoIds.length > 0) {
      setUnlockedVideoIds(user.unlockedVideoIds);
    }
  };

  const loginWithSupabase = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; message?: string; role?: UserRole }> => {
    if (!isSupabaseConfigured) {
      return { success: false, message: 'Supabase credentials are not configured in .env yet.' };
    }
    try {
      const res = await authService.signIn(email, pass);
      if (res?.user) {
        const profile = await dbService.getProfile(res.user.id);
        const emailLower = (res.user.email || email).toLowerCase();
        const isDoc = emailLower.includes('doctor') || emailLower.includes('admin') || emailLower.includes('clinic');
        const resolvedRole: UserRole = profile?.role || (isDoc ? 'admin' : ((res.user.user_metadata?.role as UserRole) || 'patient'));

        const resolvedUser: User = profile || {
          id: res.user.id,
          email: res.user.email || email,
          name: res.user.user_metadata?.name || email.split('@')[0],
          phone: res.user.user_metadata?.phone || '',
          role: resolvedRole,
          createdAt: res.user.created_at || new Date().toISOString(),
          unlockedVideoIds: []
        };

        setCurrentUser(resolvedUser);

        if (resolvedUser.role === 'admin' || resolvedUser.role === 'psychologist') {
          setUnlockedVideoIds(interventions.map((v) => v.id));
        } else if (resolvedUser.unlockedVideoIds && resolvedUser.unlockedVideoIds.length > 0) {
          setUnlockedVideoIds(resolvedUser.unlockedVideoIds);
        }

        return { success: true, role: resolvedUser.role };
      }
      return { success: false, message: 'Could not log in with given credentials.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Login error occurred.' };
    }
  };

  const signUpWithSupabase = async (
    data: SignUpData
  ): Promise<{ success: boolean; message?: string; role?: UserRole; autoLoggedIn?: boolean }> => {
    if (!isSupabaseConfigured) {
      return { success: false, message: 'Supabase credentials are not configured in .env yet.' };
    }
    try {
      const res = await authService.signUp(data);
      if (res?.user) {
        const emailLower = data.email.toLowerCase();
        const isDoc = data.role === 'admin' || data.role === 'psychologist' || emailLower.includes('doctor') || emailLower.includes('admin');
        const finalRole: UserRole = isDoc ? 'admin' : (data.role || 'patient');

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
          if (finalRole === 'admin' || finalRole === 'psychologist') {
            setUnlockedVideoIds(interventions.map((v) => v.id));
          }
          return {
            success: true,
            autoLoggedIn: true,
            role: finalRole,
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

    // Send notification
    const notif: SystemNotification = {
      id: `notif-${Date.now()}`,
      userId: newApt.patientId,
      title: 'Appointment Confirmed',
      message: `Your ${newApt.service} (${newApt.type === 'offline' ? 'In-Clinic at Tak Mohalla Road' : 'Online Call'}) on ${newApt.date} at ${newApt.timeSlot} is booked.`,
      date: 'Just now',
      read: false,
      type: 'appointment'
    };
    setNotifications((prev) => [notif, ...prev]);

    // Sync to Supabase DB
    if (isSupabaseConfigured) {
      dbService.createAppointment(newApt).catch(console.warn);
      dbService.createNotification(notif).catch(console.warn);
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

  // Interventions library management
  const addIntervention = (videoData: Omit<InterventionVideo, 'id'>) => {
    const newVideo: InterventionVideo = {
      ...videoData,
      id: `video-${Date.now()}`
    };
    setInterventions((prev) => [...prev, newVideo]);

    if (isSupabaseConfigured) {
      dbService.createIntervention(newVideo).catch(console.warn);
    }
  };

  const updateIntervention = (id: string, updates: Partial<InterventionVideo>) => {
    setInterventions((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );

    if (isSupabaseConfigured) {
      dbService.updateIntervention(id, updates).catch(console.warn);
    }
  };

  const deleteIntervention = (id: string) => {
    setInterventions((prev) => prev.filter((v) => v.id !== id));

    if (isSupabaseConfigured) {
      dbService.deleteIntervention(id).catch(console.warn);
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
        articles,
        publishArticle,
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
