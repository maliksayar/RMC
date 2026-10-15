export type UserRole = 'patient' | 'admin' | 'psychologist';

export const isUserAdmin = (roleOrUser?: UserRole | User | null): boolean => {
  if (!roleOrUser) return false;
  if (typeof roleOrUser === 'string') {
    return roleOrUser === 'admin' || roleOrUser === 'psychologist';
  }
  if (roleOrUser.role === 'admin' || roleOrUser.role === 'psychologist') return true;
  const name = (roleOrUser.name || '').toLowerCase();
  const email = (roleOrUser.email || '').toLowerCase();
  return (
    name.includes('msdr') ||
    name.includes('doctor') ||
    name.includes('malik') ||
    name.includes('sayar') ||
    name.includes('admin') ||
    email.includes('msdr') ||
    email.includes('doctor') ||
    email.includes('malik') ||
    email.includes('sayar') ||
    email.includes('admin') ||
    email.includes('clinic')
  );
};

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  unlockedVideoIds?: string[];
}

export type TreatmentArea =
  | 'Anxiety'
  | 'Depression'
  | 'OCD'
  | 'Overthinking'
  | 'Fear & Phobias'
  | 'Sleep Problems';

export type ClinicService =
  | 'Psychotherapy'
  | 'Clinical Hypnotherapy'
  | 'Mental Health & Wellbeing';

export type ResourceKind = 'intervention' | 'educational';

export interface InterventionVideo {
  id: string;
  title: string;
  resourceKind?: ResourceKind; // 'intervention' (Category A) or 'educational' (Category B)
  isRestricted?: boolean; // false = public, true = PIN required
  typicallyAssignedFor?: string;
  treatmentArea?: TreatmentArea;
  category: string;
  duration: string;
  description: string;
  clinicalRationale?: string;
  tags?: string[];
  type?: 'video' | 'audio' | 'interactive';
  thumbnailUrl: string;
  videoUrl?: string;
  interactiveType?: 'breathing' | 'grounding' | 'pmr' | 'cbt-record' | 'meditation' | 'sleep-checklist';
  keySteps?: string[];
  whatItIs?: string;
  whyUsed?: string;
  howToPerform?: string;
  commonMistakes?: string;
  whatYouMightExperience?: string;
  questionsDoubts?: string;
  howAndWhenToPractise?: string;
}

export interface AccessPin {
  id: string;
  code: string;
  patientId: string;
  patientName: string;
  assignedVideoIds: string[];
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'revoked';
  issuedBy: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  service: ClinicService;
  treatmentArea: TreatmentArea;
  type: 'online' | 'offline'; // 'offline' = In-clinic at Bijbehara
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  coverImage: string;
  summary: string;
  sections: {
    heading: string;
    body: string;
  }[];
  keyTakeaways: string[];
}

export interface SystemNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'pin' | 'appointment' | 'system' | 'library';
}
