-- Create tasks table
-- Daily tasks for family members

CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  reference_id UUID,
  due_date DATE NOT NULL,
  due_time TIME,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT tasks_type_check CHECK (type IN ('medication', 'vital', 'appointment', 'custom'))
);

-- Create indexes
CREATE INDEX idx_tasks_family_id ON public.tasks(family_id);
CREATE INDEX idx_tasks_member_id ON public.tasks(member_id);
CREATE INDEX idx_tasks_due_date_completed ON public.tasks(due_date, completed);

-- Add comment
COMMENT ON TABLE public.tasks IS 'Daily health tasks for family members';
