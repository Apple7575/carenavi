-- Create health_reports table
-- AI-generated health reports

CREATE TABLE IF NOT EXISTS public.health_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  summary TEXT NOT NULL,
  content JSONB NOT NULL,
  insights JSONB,
  recommendations JSONB,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT health_reports_period_check CHECK (period_start <= period_end)
);

-- Create indexes
CREATE INDEX idx_health_reports_family_id ON public.health_reports(family_id);
CREATE INDEX idx_health_reports_member_id ON public.health_reports(member_id);
CREATE INDEX idx_health_reports_generated_at ON public.health_reports(generated_at DESC);

-- Add comment
COMMENT ON TABLE public.health_reports IS 'AI-generated health analysis reports';
