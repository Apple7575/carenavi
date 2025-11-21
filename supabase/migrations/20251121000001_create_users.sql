-- Create users table (extends auth.users)
-- User information for the CareNavi platform

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) NOT NULL DEFAULT 'caregiver',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT users_role_check CHECK (role IN ('caregiver', 'patient'))
);

-- Create index on email for fast lookups
CREATE INDEX idx_users_email ON public.users(email);

-- Add comment
COMMENT ON TABLE public.users IS 'User profiles extending Supabase Auth users';
