-- Create medication_logs table
-- Medication adherence tracking

CREATE TABLE IF NOT EXISTS public.medication_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  taken_at TIMESTAMPTZ,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT medication_logs_status_check CHECK (status IN ('pending', 'taken', 'skipped')),
  CONSTRAINT medication_logs_taken_at_check CHECK (
    (status = 'taken' AND taken_at IS NOT NULL) OR
    (status != 'taken')
  )
);

-- Create indexes
CREATE INDEX idx_medication_logs_medication_id ON public.medication_logs(medication_id);
CREATE INDEX idx_medication_logs_scheduled_at ON public.medication_logs(scheduled_at);
CREATE INDEX idx_medication_logs_status ON public.medication_logs(status);

-- Add comment
COMMENT ON TABLE public.medication_logs IS 'Medication adherence logs';
