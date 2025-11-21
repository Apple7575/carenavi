-- Fix infinite recursion in family_members RLS policy
-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can view family members" ON family_members;

-- Create a new policy that doesn't cause recursion
-- Users can view family members where they are already a member OR where it's their own record
CREATE POLICY "Users can view family members"
  ON family_members FOR SELECT
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM family_members fm
      WHERE fm.family_id = family_members.family_id
      AND fm.user_id = auth.uid()
    )
  );
