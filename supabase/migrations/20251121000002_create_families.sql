-- Create families table
-- Family groups for sharing health data

CREATE TABLE IF NOT EXISTS public.families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  invite_code VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_families_invite_code ON public.families(invite_code);
CREATE INDEX idx_families_created_by ON public.families(created_by);

-- Add comment
COMMENT ON TABLE public.families IS 'Family groups for health data sharing';
