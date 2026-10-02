export type UserRole = 'patient' | 'psychologist';

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

export interface InterventionVideo {
  id: string;
  title: string;
  typicallyAssignedFor: string;
  treatmentArea: TreatmentArea;
  category: 'CBT' | 'Mindfulness & Relaxation' | 'Behavioral' | 'Hypnotherapy';
  duration: string;
  description: string;
  clinicalRationale: string;
  tags: string[];
  type: 'video' | 'audio' | 'interactive';
  thumbnailUrl: string;
  videoUrl?: string;
  interactiveType?: 'breathing' | 'grounding' | 'pmr' | 'cbt-record' | 'meditation' | 'sleep-checklist';
  keySteps: string[];
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
