-- ==============================================================================
-- REALITY MIND CLINIC (RMC) - SUPABASE DATABASE SCHEMA
-- Run this complete script in the Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create PROFILES Table (Synced with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'psychologist')),
  avatar TEXT,
  unlocked_video_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Trigger: Automatically Create Profile on User Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, phone, role, unlocked_video_ids)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    CASE
      WHEN lower(new.email) IN ('doctor@realitymindclinic.com', 'clinic@realitymind.com') THEN 'admin'
      ELSE 'patient'
    END,
    '{}'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3. Create APPOINTMENTS Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  patient_id TEXT,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  service TEXT NOT NULL,
  treatment_area TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('online', 'offline')),
  date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can book an appointment" ON public.appointments;
CREATE POLICY "Anyone can book an appointment"
  ON public.appointments FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Appointments are viewable by all authenticated users" ON public.appointments;
CREATE POLICY "Appointments are viewable by all authenticated users"
  ON public.appointments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow appointment status updates" ON public.appointments;
CREATE POLICY "Allow appointment status updates"
  ON public.appointments FOR UPDATE
  USING (true);


-- 4. Create ACCESS_PINS Table
CREATE TABLE IF NOT EXISTS public.access_pins (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  patient_id TEXT,
  patient_name TEXT NOT NULL,
  assigned_video_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked')),
  issued_by TEXT,
  notes TEXT
);

ALTER TABLE public.access_pins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Access pins are viewable by anyone" ON public.access_pins;
CREATE POLICY "Access pins are viewable by anyone"
  ON public.access_pins FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Psychologist or authenticated users can manage pins" ON public.access_pins;
CREATE POLICY "Psychologist or authenticated users can manage pins"
  ON public.access_pins FOR ALL
  USING (true);


-- 5. Create INTERVENTIONS Table (Clinical Videos & Guided Exercises)
CREATE TABLE IF NOT EXISTS public.interventions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  resource_kind TEXT DEFAULT 'intervention',
  is_restricted BOOLEAN DEFAULT false,
  typically_assigned_for TEXT,
  treatment_area TEXT,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  clinical_rationale TEXT,
  tags TEXT[] DEFAULT '{}',
  type TEXT DEFAULT 'interactive',
  thumbnail_url TEXT NOT NULL,
  video_url TEXT,
  interactive_type TEXT,
  key_steps TEXT[] DEFAULT '{}',
  what_it_is TEXT,
  why_used TEXT,
  how_to_perform TEXT,
  common_mistakes TEXT,
  what_you_might_experience TEXT,
  questions_doubts TEXT,
  how_and_when_to_practise TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.interventions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Interventions are viewable by everyone" ON public.interventions;
CREATE POLICY "Interventions are viewable by everyone"
  ON public.interventions FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow managing interventions" ON public.interventions;
CREATE POLICY "Allow managing interventions"
  ON public.interventions FOR ALL
  USING (true);


-- 6. Create ARTICLES Table (Psychoeducation & Articles)
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  published_date TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  summary TEXT NOT NULL,
  sections JSONB DEFAULT '[]'::jsonb,
  key_takeaways TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Articles are viewable by everyone" ON public.articles;
CREATE POLICY "Articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow managing articles" ON public.articles;
CREATE POLICY "Allow managing articles"
  ON public.articles FOR ALL
  USING (true);


-- 7. Create NOTIFICATIONS Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  type TEXT DEFAULT 'system',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Notifications are viewable by everyone" ON public.notifications;
CREATE POLICY "Notifications are viewable by everyone"
  ON public.notifications FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow managing notifications" ON public.notifications;
CREATE POLICY "Allow managing notifications"
  ON public.notifications FOR ALL
  USING (true);


-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Sample PIN
INSERT INTO public.access_pins (id, code, patient_id, patient_name, assigned_video_ids, created_at, expires_at, status, issued_by, notes)
VALUES (
  'pin-demo-1',
  'RMC-2026',
  'patient-demo-1',
  'Aamir Mir',
  ARRAY['progressive-muscle-relaxation', 'cbt-thought-record', 'safe-place-hypno', 'sleep-restriction'],
  NOW(),
  NOW() + INTERVAL '30 days',
  'active',
  'Dr. Psychologist (Bijbehara)',
  'Special prescription for somatic anxiety regulation and sleep hygiene'
) ON CONFLICT (code) DO NOTHING;

-- Seed Sample Interventions
INSERT INTO public.interventions (
  id, title, resource_kind, is_restricted, typically_assigned_for, treatment_area,
  category, duration, description, clinical_rationale, type, interactive_type,
  thumbnail_url, what_it_is, why_used, how_to_perform, common_mistakes,
  what_you_might_experience, questions_doubts, how_and_when_to_practise, key_steps
)
VALUES
(
  'diaphragmatic-breathing',
  'Deep Breathing — Complete Guided Practice',
  'intervention',
  false,
  'Anxiety, panic attacks, stress, somatic hyperventilation',
  'Anxiety',
  'Mindfulness & Relaxation',
  '12 mins',
  'A comprehensive, therapist-guided deep breathing practice. Learn how to downregulate the autonomic nervous system using rhythmic abdominal pacing.',
  'Directly stimulates the vagus nerve, initiating parasympathetic tone and terminating hyperventilation-induced panic loops.',
  'interactive',
  'breathing',
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
  'A structured physiological breathing technique that expands the diaphragm and lower abdomen rather than the upper chest.',
  'During anxiety or panic, breathing becomes rapid and shallow, expelling CO2 and causing dizziness and racing heart. Diaphragmatic breathing restores physiological balance.',
  'Place one hand on your chest and one on your belly. Inhale smoothly for 4 seconds allowing the belly to rise. Hold gently for 4 seconds. Exhale slowly for 6 seconds.',
  'Over-inflating upper chest or forcing breath aggressively.',
  'Initial unfamiliarity followed by slower pulse and muscle softening.',
  'If you feel dizzy, slow down and pause between breaths.',
  'Practise twice daily for 5-10 minutes when calm to build muscle memory.',
  ARRAY['What it is: Abdominal regulation', 'Why used: Vagus nerve activation', 'How: 4s inhale, 4s hold, 6s exhale']
),
(
  'grounding-54321',
  'Grounding (5-4-3-2-1 Sensory Reset) — Guided Practice',
  'intervention',
  false,
  'Panic surges, acute anxiety, dissociation, derealization',
  'Anxiety',
  'Mindfulness & Relaxation',
  '10 mins',
  'An interactive somatic orientation practice that pulls focus away from internal catastrophizing into concrete external sensory anchors.',
  'Re-engages prefrontal cortex sensory processing, breaking depersonalization and acute distress surges.',
  'interactive',
  'grounding',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'A sequential 5-step sensory anchoring protocol engaging sight, touch, sound, smell, and taste.',
  'During acute panic, the mind disconnects from the physical environment. Grounding re-anchors the nervous system to the present moment.',
  'Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, and 1 taste.',
  'Rushing through numbers mentally without genuinely noticing tactile sensations.',
  'Immediate reduction in mental fog and racing heart.',
  'Use neutral anchors like ambient room temperature or a sip of water.',
  'Deploy whenever dissociation, panic, or acute worry spikes.',
  ARRAY['5 things you see', '4 things you touch', '3 sounds you hear', '2 scents you smell', '1 taste in mouth']
),
(
  'progressive-muscle-relaxation',
  'Progressive Muscle Relaxation (PMR) — Guided Practice',
  'intervention',
  true,
  'Chronic muscular tension, anxiety, insomnia, psychosomatic pain',
  'Sleep Problems',
  'Mindfulness & Relaxation',
  '22 mins',
  'Full-body Edmund Jacobson clinical sequence systematically tensing and relaxing major muscle groups from feet to facial forehead.',
  'Eliminates subconscious muscular bracing, providing deep neuro-somatic relief and promoting restorative sleep onset.',
  'interactive',
  'pmr',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
  'A clinical protocol of deliberate isometric muscle contraction followed by sudden complete release.',
  'Chronic stress causes ongoing muscular bracing. PMR breaks this somatic feedback loop.',
  'Tense each muscle group for 5-7 seconds at 70% effort, then release abruptly for 20 seconds.',
  'Tensing too hard or releasing too slowly.',
  'Heavy, limp limbs, tingling warmth, and deep mental drowsiness.',
  'Exceptional bedtime routine for insomnia.',
  'Practise 20 minutes before sleep or during high somatic tension.',
  ARRAY['Feet & Toes', 'Calves & Shins', 'Thighs & Glutes', 'Abdomen', 'Shoulders & Neck', 'Face & Forehead']
)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Articles
INSERT INTO public.articles (
  id, title, subtitle, category, read_time, published_date, author, cover_image, summary, key_takeaways
)
VALUES
(
  'art-1',
  'Understanding Panic Attacks vs Anxiety: The Somatic Differences',
  'Why your heart races and how to stop fearing the adrenaline surge',
  'Anxiety & Panic',
  '6 min read',
  'Oct 1, 2026',
  'Reality Mind Clinic Clinical Team',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
  'Many individuals confuse generalized chronic worry with acute panic disorder. Understanding the autonomic nervous system is the first step in clinical recovery.',
  ARRAY['Panic attacks are brief, intense surges of sympathetic arousal, peaking within 10 minutes.', 'Anxiety is chronic, persistent apprehension accompanied by muscle tension.', 'Interoceptive exposure and diaphragmatic breathing interrupt the fear-of-fear cycle.']
),
(
  'art-2',
  'The Mechanism of Clinical Hypnotherapy: Beyond Myths & Stage Magic',
  'How focused neuro-plastic trance alters autonomic responses and chronic distress',
  'Clinical Hypnotherapy',
  '8 min read',
  'Sep 24, 2026',
  'Clinical Hypnotherapist · Bijbehara Practice',
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80',
  'Clinical hypnotherapy is an evidence-based adjunctive modality utilizing heightened focus to bypass conscious critical filters and reprogram automatic maladaptive responses.',
  ARRAY['Hypnosis is not sleep or loss of control; it is focused neuro-attentional absorption.', 'The critical conscious mind steps aside, allowing deep subconscious reprocessing.', 'Highly effective for phobias, psychosomatic tension, and insomnia.']
)
ON CONFLICT (id) DO NOTHING;
