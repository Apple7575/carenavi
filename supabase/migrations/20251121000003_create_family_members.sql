-- Create family_members table
-- Join table connecting users to families

CREATE TABLE IF NOT EXISTS public.family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  nickname VARCHAR(50) NOT NULL,
  relationship VARCHAR(20) NOT NULL,
  health_score INTEGER CHECK (health_score >= 0 AND health_score <= 100),
  status VARCHAR(20) NOT NULL DEFAULT 'good',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT family_members_relationship_check CHECK (relationship IN ('self', 'parent', 'child', 'spouse', 'other')),
  CONSTRAINT family_members_status_check CHECK (status IN ('good', 'fair', 'needs_review')),
  CONSTRAINT family_members_unique_member UNIQUE (family_id, user_id)
);

-- Create indexes
CREATE INDEX idx_family_members_family_id ON public.family_members(family_id);
CREATE INDEX idx_family_members_user_id ON public.family_members(user_id);

-- Add comment
COMMENT ON TABLE public.family_members IS 'Family membership and health status';
