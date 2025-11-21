-- Create medications table
-- Medication information for family members

CREATE TABLE IF NOT EXISTS public.medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  dosage VARCHAR(50) NOT NULL,
  frequency VARCHAR(50) NOT NULL,
  schedule_times JSONB NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT medications_date_check CHECK (end_date IS NULL OR start_date <= end_date)
);

-- Create indexes
CREATE INDEX idx_medications_family_id ON public.medications(family_id);
CREATE INDEX idx_medications_member_id ON public.medications(member_id);
CREATE INDEX idx_medications_active ON public.medications(is_active) WHERE is_active = TRUE;

-- Add comment
COMMENT ON TABLE public.medications IS 'Medication schedules for family members';
