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

interface AppContextType {
  currentUser: User | null;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  loginAs: (user: User) => void;
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
  generatePin: (patientName: string, assignedVideoIds: string[], expiryDays: number, notes?: string) => AccessPin;
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
  
  // Global Modals State
  pinModalOpen: boolean;
  setPinModalOpen: (open: boolean) => void;
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
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

  // Interventions library
  const [interventions, setInterventions] = useState<InterventionVideo[]>(() => {
    const saved = localStorage.getItem('rmc_interventions');
    return saved ? JSON.parse(saved) : INITIAL_INTERVENTIONS;
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
        message: 'In-clinic consultation scheduled for Oct 5 at Tak Mohalla Road, Bijbehara.',
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
  const [activeVideo, setActiveVideo] = useState<InterventionVideo | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

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

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'psychologist') {
      setCurrentUser(DEMO_USERS[1]);
      // Psychologist has master access to all videos
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
    if (user.role === 'psychologist') {
      setUnlockedVideoIds(interventions.map((v) => v.id));
    } else if (user.unlockedVideoIds) {
      setUnlockedVideoIds(user.unlockedVideoIds);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUnlockedVideoIds([]);
    setActiveUnlockedPin(null);
  };

  // Verify PIN logic
  const verifyAndUnlockPin = (code: string): { success: boolean; message: string; pin?: AccessPin } => {
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
    return newPin;
  };

  const revokePin = (pinId: string) => {
    setPins((prev) =>
      prev.map((p) => (p.id === pinId ? { ...p, status: 'revoked' as const } : p))
    );
  };

  // Book appointment
  const bookAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment => {
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

    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  // Interventions library management
  const addIntervention = (videoData: Omit<InterventionVideo, 'id'>) => {
    const newVideo: InterventionVideo = {
      ...videoData,
      id: `video-${Date.now()}`
    };
    setInterventions((prev) => [...prev, newVideo]);
  };

  const updateIntervention = (id: string, updates: Partial<InterventionVideo>) => {
    setInterventions((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  const deleteIntervention = (id: string) => {
    setInterventions((prev) => prev.filter((v) => v.id !== id));
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
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        role,
        switchRole,
        loginAs,
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
        pinModalOpen,
        setPinModalOpen,
        bookingModalOpen,
        setBookingModalOpen,
        authModalOpen,
        setAuthModalOpen,
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
