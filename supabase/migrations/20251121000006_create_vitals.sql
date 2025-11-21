-- Create vitals table
-- Health vital measurements

CREATE TABLE IF NOT EXISTS public.vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  value VARCHAR(50) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  measured_at TIMESTAMPTZ NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT vitals_type_check CHECK (type IN ('blood_pressure', 'blood_sugar', 'weight', 'heart_rate'))
);

-- Create indexes
CREATE INDEX idx_vitals_family_id ON public.vitals(family_id);
CREATE INDEX idx_vitals_member_id ON public.vitals(member_id);
CREATE INDEX idx_vitals_type_measured_at ON public.vitals(type, measured_at DESC);

-- Add comment
COMMENT ON TABLE public.vitals IS 'Health vital measurements for family members';
