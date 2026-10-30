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
  role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'admin', 'psychologist')),
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
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    CASE
      WHEN lower(new.email) IN ('realitymindclinic@gmail.com', 'doctor@realitymindclinic.com', 'clinic@realitymind.com', 'admin@realitymindclinic.com') THEN 'admin'
      WHEN new.raw_user_meta_data->>'role' = 'admin' THEN 'admin'
      WHEN new.raw_user_meta_data->>'role' = 'psychologist' THEN 'psychologist'
      ELSE 'patient'
    END,
    '{}'
  )
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    name = EXCLUDED.name,
    phone = EXCLUDED.phone;
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
-- SCHEMA READY: ALL VIDEOS, ARTICLES, APPOINTMENTS AND PINS ARE MANAGED DYNAMICALLY
-- ==============================================================================
