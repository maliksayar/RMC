import { supabase, isSupabaseConfigured } from './supabase';
import {
  User,
  Appointment,
  AccessPin,
  InterventionVideo,
  BlogArticle,
  SystemNotification
} from '../types';

// Convert DB snake_case to frontend camelCase & vice-versa

export const dbService = {
  // ===============================
  // AUTH & USER PROFILES
  // ===============================
  async getProfile(userId: string): Promise<User | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) return null;

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone || '',
        role: data.role || 'patient',
        avatar: data.avatar || undefined,
        unlockedVideoIds: data.unlocked_video_ids || [],
        createdAt: data.created_at
      };
    } catch (e) {
      console.warn('Supabase getProfile error:', e);
      return null;
    }
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const payload: Record<string, any> = {};
      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.phone !== undefined) payload.phone = updates.phone;
      if (updates.role !== undefined) payload.role = updates.role;
      if (updates.avatar !== undefined) payload.avatar = updates.avatar;
      if (updates.unlockedVideoIds !== undefined) {
        payload.unlocked_video_ids = updates.unlockedVideoIds;
      }

      const { error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', userId);

      return !error;
    } catch (e) {
      console.warn('Supabase updateProfile error:', e);
      return false;
    }
  },

  // ===============================
  // APPOINTMENTS
  // ===============================
  async getAppointments(): Promise<Appointment[] | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((item) => ({
        id: item.id,
        patientId: item.patient_id,
        patientName: item.patient_name,
        patientPhone: item.patient_phone,
        patientEmail: item.patient_email,
        service: item.service,
        treatmentArea: item.treatment_area,
        type: item.type,
        date: item.date,
        timeSlot: item.time_slot,
        status: item.status,
        notes: item.notes,
        createdAt: item.created_at
      }));
    } catch (e) {
      console.warn('Supabase getAppointments error:', e);
      return null;
    }
  },

  async createAppointment(apt: Appointment): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('appointments').insert({
        id: apt.id,
        patient_id: apt.patientId,
        patient_name: apt.patientName,
        patient_phone: apt.patientPhone,
        patient_email: apt.patientEmail,
        service: apt.service,
        treatment_area: apt.treatmentArea,
        type: apt.type,
        date: apt.date,
        time_slot: apt.timeSlot,
        status: apt.status,
        notes: apt.notes,
        created_at: apt.createdAt
      });

      return !error;
    } catch (e) {
      console.warn('Supabase createAppointment error:', e);
      return false;
    }
  },

  async updateAppointmentStatus(id: string, status: Appointment['status']): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      return !error;
    } catch (e) {
      console.warn('Supabase updateAppointmentStatus error:', e);
      return false;
    }
  },

  // ===============================
  // ACCESS PINS
  // ===============================
  async getPins(): Promise<AccessPin[] | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('access_pins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((item) => ({
        id: item.id,
        code: item.code,
        patientId: item.patient_id,
        patientName: item.patient_name,
        assignedVideoIds: item.assigned_video_ids || [],
        createdAt: item.created_at,
        expiresAt: item.expires_at,
        status: item.status,
        issuedBy: item.issued_by,
        notes: item.notes
      }));
    } catch (e) {
      console.warn('Supabase getPins error:', e);
      return null;
    }
  },

  async createPin(pin: AccessPin): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('access_pins').insert({
        id: pin.id,
        code: pin.code,
        patient_id: pin.patientId,
        patient_name: pin.patientName,
        assigned_video_ids: pin.assignedVideoIds,
        created_at: pin.createdAt,
        expires_at: pin.expiresAt,
        status: pin.status,
        issued_by: pin.issuedBy,
        notes: pin.notes
      });

      return !error;
    } catch (e) {
      console.warn('Supabase createPin error:', e);
      return false;
    }
  },

  async updatePinStatus(id: string, status: 'active' | 'expired' | 'revoked'): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase
        .from('access_pins')
        .update({ status })
        .eq('id', id);

      return !error;
    } catch (e) {
      console.warn('Supabase updatePinStatus error:', e);
      return false;
    }
  },

  // ===============================
  // INTERVENTIONS (VIDEOS & GUIDES)
  // ===============================
  async getInterventions(): Promise<InterventionVideo[] | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('interventions')
        .select('*')
        .order('created_at', { ascending: true });

      if (error || !data || data.length === 0) return null;

      return data.map((item) => ({
        id: item.id,
        title: item.title,
        resourceKind: item.resource_kind,
        isRestricted: item.is_restricted,
        typicallyAssignedFor: item.typically_assigned_for,
        treatmentArea: item.treatment_area,
        category: item.category,
        duration: item.duration,
        description: item.description,
        clinicalRationale: item.clinical_rationale,
        tags: item.tags || [],
        type: item.type,
        thumbnailUrl: item.thumbnail_url,
        videoUrl: item.video_url,
        interactiveType: item.interactive_type,
        keySteps: item.key_steps || [],
        whatItIs: item.what_it_is,
        whyUsed: item.why_used,
        howToPerform: item.how_to_perform,
        commonMistakes: item.common_mistakes,
        whatYouMightExperience: item.what_you_might_experience,
        questionsDoubts: item.questions_doubts,
        howAndWhenToPractise: item.how_and_when_to_practise
      }));
    } catch (e) {
      console.warn('Supabase getInterventions error:', e);
      return null;
    }
  },

  async createIntervention(video: InterventionVideo): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('interventions').insert({
        id: video.id,
        title: video.title,
        resource_kind: video.resourceKind,
        is_restricted: video.isRestricted,
        typically_assigned_for: video.typicallyAssignedFor,
        treatment_area: video.treatmentArea,
        category: video.category,
        duration: video.duration,
        description: video.description,
        clinical_rationale: video.clinicalRationale,
        tags: video.tags,
        type: video.type,
        thumbnail_url: video.thumbnailUrl,
        video_url: video.videoUrl,
        interactive_type: video.interactiveType,
        key_steps: video.keySteps,
        what_it_is: video.whatItIs,
        why_used: video.whyUsed,
        how_to_perform: video.howToPerform,
        common_mistakes: video.commonMistakes,
        what_you_might_experience: video.whatYouMightExperience,
        questions_doubts: video.questionsDoubts,
        how_and_when_to_practise: video.howAndWhenToPractise
      });

      return !error;
    } catch (e) {
      console.warn('Supabase createIntervention error:', e);
      return false;
    }
  },

  async updateIntervention(id: string, updates: Partial<InterventionVideo>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const payload: Record<string, any> = {};
      if (updates.title !== undefined) payload.title = updates.title;
      if (updates.description !== undefined) payload.description = updates.description;
      if (updates.category !== undefined) payload.category = updates.category;
      if (updates.duration !== undefined) payload.duration = updates.duration;
      if (updates.isRestricted !== undefined) payload.is_restricted = updates.isRestricted;

      const { error } = await supabase
        .from('interventions')
        .update(payload)
        .eq('id', id);

      return !error;
    } catch (e) {
      console.warn('Supabase updateIntervention error:', e);
      return false;
    }
  },

  async deleteIntervention(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase
        .from('interventions')
        .delete()
        .eq('id', id);

      return !error;
    } catch (e) {
      console.warn('Supabase deleteIntervention error:', e);
      return false;
    }
  },

  // ===============================
  // ARTICLES
  // ===============================
  async getArticles(): Promise<BlogArticle[] | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) return null;

      return data.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        category: item.category,
        readTime: item.read_time,
        publishedDate: item.published_date,
        author: item.author,
        coverImage: item.cover_image,
        summary: item.summary,
        sections: item.sections || [],
        keyTakeaways: item.key_takeaways || []
      }));
    } catch (e) {
      console.warn('Supabase getArticles error:', e);
      return null;
    }
  },

  async createArticle(art: BlogArticle): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('articles').insert({
        id: art.id,
        title: art.title,
        subtitle: art.subtitle,
        category: art.category,
        read_time: art.readTime,
        published_date: art.publishedDate,
        author: art.author,
        cover_image: art.coverImage,
        summary: art.summary,
        sections: art.sections,
        key_takeaways: art.keyTakeaways
      });

      return !error;
    } catch (e) {
      console.warn('Supabase createArticle error:', e);
      return false;
    }
  },

  // ===============================
  // NOTIFICATIONS
  // ===============================
  async getNotifications(userId?: string): Promise<SystemNotification[] | null> {
    if (!isSupabaseConfigured) return null;
    try {
      let query = supabase.from('notifications').select('*').order('created_at', { ascending: false });
      if (userId) {
        query = query.or(`user_id.eq.${userId},user_id.eq.all`);
      }
      const { data, error } = await query;
      if (error || !data) return null;

      return data.map((item) => ({
        id: item.id,
        userId: item.user_id,
        title: item.title,
        message: item.message,
        date: item.date,
        read: item.read,
        type: item.type
      }));
    } catch (e) {
      console.warn('Supabase getNotifications error:', e);
      return null;
    }
  },

  async createNotification(notif: SystemNotification): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('notifications').insert({
        id: notif.id,
        user_id: notif.userId,
        title: notif.title,
        message: notif.message,
        date: notif.date,
        read: notif.read,
        type: notif.type
      });

      return !error;
    } catch (e) {
      console.warn('Supabase createNotification error:', e);
      return false;
    }
  },

  async markNotificationRead(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      return !error;
    } catch (e) {
      console.warn('Supabase markNotificationRead error:', e);
      return false;
    }
  }
};
