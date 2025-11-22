-- Add user_id column to vitals and medications tables for individual user support
-- This allows users to use vitals and medications without being part of a family

-- Add user_id to vitals table
ALTER TABLE vitals ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id to medications table
ALTER TABLE medications ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update existing records to populate user_id from member_id
UPDATE vitals v
SET user_id = fm.user_id
FROM family_members fm
WHERE v.member_id = fm.id AND v.user_id IS NULL;

UPDATE medications m
SET user_id = fm.user_id
FROM family_members fm
WHERE m.member_id = fm.id AND m.user_id IS NULL;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vitals_user_id ON vitals(user_id);
CREATE INDEX IF NOT EXISTS idx_medications_user_id ON medications(user_id);

-- Update RLS policies for vitals to support user_id
DROP POLICY IF EXISTS "Users can view their family vitals" ON vitals;
DROP POLICY IF EXISTS "Users can insert their family vitals" ON vitals;
DROP POLICY IF EXISTS "Users can update their family vitals" ON vitals;
DROP POLICY IF EXISTS "Users can delete their family vitals" ON vitals;

CREATE POLICY "Users can view their own vitals"
  ON vitals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own vitals"
  ON vitals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vitals"
  ON vitals FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vitals"
  ON vitals FOR DELETE
  USING (auth.uid() = user_id);

-- Update RLS policies for medications to support user_id
DROP POLICY IF EXISTS "Users can view their family medications" ON medications;
DROP POLICY IF EXISTS "Users can insert their family medications" ON medications;
DROP POLICY IF EXISTS "Users can update their family medications" ON medications;
DROP POLICY IF EXISTS "Users can delete their family medications" ON medications;

CREATE POLICY "Users can view their own medications"
  ON medications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own medications"
  ON medications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medications"
  ON medications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medications"
  ON medications FOR DELETE
  USING (auth.uid() = user_id);
