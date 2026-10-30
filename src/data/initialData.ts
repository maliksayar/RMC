import { InterventionVideo, BlogArticle, AccessPin, Appointment, User } from '../types';

// Clinical Interventions: Empty by default. Videos are dynamically uploaded by the Doctor.
export const INITIAL_INTERVENTIONS: InterventionVideo[] = [];

// Access PINs: Empty by default. Dynamically generated and issued by the Doctor.
export const INITIAL_PINS: AccessPin[] = [];

// Appointments: Empty by default. Dynamically populated through patient bookings.
export const INITIAL_APPOINTMENTS: Appointment[] = [];

// Articles: Empty by default. Dynamically authored and published by the Doctor.
export const INITIAL_ARTICLES: BlogArticle[] = [];

// Default practice users
export const DEMO_USERS: User[] = [
  {
    id: '32d5ebbd-476a-4199-b9fe-4c2410ffa230',
    name: 'Yehya Hassan (Doctor Admin)',
    email: 'realitymindclinic@gmail.com',
    phone: '+91 6005754205',
    role: 'admin',
    createdAt: '2026-01-01',
    unlockedVideoIds: []
  }
];
