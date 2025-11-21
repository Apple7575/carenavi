-- Completely fix the RLS recursion issue
-- Drop all existing problematic policies
DROP POLICY IF EXISTS "Users can view family members" ON family_members;
DROP POLICY IF EXISTS "Users can join family" ON family_members;
DROP POLICY IF EXISTS "Users can update own nickname" ON family_members;
DROP POLICY IF EXISTS "Users can view own families" ON families;
DROP POLICY IF EXISTS "Users can create families" ON families;
DROP POLICY IF EXISTS "Creator can update family" ON families;
DROP POLICY IF EXISTS "Users can view family medications" ON medications;
DROP POLICY IF EXISTS "Users can manage family medications" ON medications;
DROP POLICY IF EXISTS "Users can view family medication logs" ON medication_logs;
DROP POLICY IF EXISTS "Users can manage family medication logs" ON medication_logs;
DROP POLICY IF EXISTS "Users can view family vitals" ON vitals;
DROP POLICY IF EXISTS "Users can manage family vitals" ON vitals;
DROP POLICY IF EXISTS "Users can view family reports" ON health_reports;
DROP POLICY IF EXISTS "Users can create family reports" ON health_reports;
DROP POLICY IF EXISTS "Users can view family tasks" ON tasks;
DROP POLICY IF EXISTS "Users can manage family tasks" ON tasks;

-- Create a table to cache user family memberships to avoid recursion
-- This table will be updated by triggers
CREATE TABLE IF NOT EXISTS public.user_family_cache (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  family_id UUID REFERENCES public.families(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on family_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_family_cache_family_id ON public.user_family_cache(family_id);

-- Create a trigger function to update the cache
CREATE OR REPLACE FUNCTION update_user_family_cache()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    INSERT INTO public.user_family_cache (user_id, family_id, updated_at)
    VALUES (NEW.user_id, NEW.family_id, NOW())
    ON CONFLICT (user_id)
    DO UPDATE SET
      family_id = EXCLUDED.family_id,
      updated_at = NOW();
  ELSIF TG_OP = 'DELETE' THEN
    DELETE FROM public.user_family_cache WHERE user_id = OLD.user_id;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger on family_members
DROP TRIGGER IF EXISTS trigger_update_user_family_cache ON family_members;
CREATE TRIGGER trigger_update_user_family_cache
  AFTER INSERT OR UPDATE OR DELETE ON family_members
  FOR EACH ROW
  EXECUTE FUNCTION update_user_family_cache();

-- Populate the cache with existing data
INSERT INTO public.user_family_cache (user_id, family_id, updated_at)
SELECT user_id, family_id, NOW()
FROM family_members
ON CONFLICT (user_id) DO NOTHING;

-- Family members: Simple policy without recursion using the cache
CREATE POLICY "Users can view family members"
  ON family_members FOR SELECT
  USING (
    user_id = auth.uid()
    OR family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can add family members"
  ON family_members FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    OR family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update family members"
  ON family_members FOR UPDATE
  USING (
    family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete family members"
  ON family_members FOR DELETE
  USING (
    family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid())
  );

-- Families: Use the cache table
CREATE POLICY "Users can view own families"
  ON families FOR SELECT
  USING (id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid()));

CREATE POLICY "Users can create families"
  ON families FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Creators can update families"
  ON families FOR UPDATE
  USING (created_by = auth.uid());

-- Medications policies
CREATE POLICY "Users can view family medications"
  ON medications FOR SELECT
  USING (family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage family medications"
  ON medications FOR ALL
  USING (family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid()));

-- Medication logs policies
CREATE POLICY "Users can view family medication logs"
  ON medication_logs FOR SELECT
  USING (
    medication_id IN (
      SELECT id FROM medications
      WHERE family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage family medication logs"
  ON medication_logs FOR ALL
  USING (
    medication_id IN (
      SELECT id FROM medications
      WHERE family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid())
    )
  );

-- Vitals policies
CREATE POLICY "Users can view family vitals"
  ON vitals FOR SELECT
  USING (family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage family vitals"
  ON vitals FOR ALL
  USING (family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid()));

-- Health reports policies
CREATE POLICY "Users can view family reports"
  ON health_reports FOR SELECT
  USING (family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid()));

CREATE POLICY "Users can create family reports"
  ON health_reports FOR INSERT
  WITH CHECK (family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid()));

-- Tasks policies
CREATE POLICY "Users can view family tasks"
  ON tasks FOR SELECT
  USING (family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage family tasks"
  ON tasks FOR ALL
  USING (family_id IN (SELECT family_id FROM user_family_cache WHERE user_id = auth.uid()));
