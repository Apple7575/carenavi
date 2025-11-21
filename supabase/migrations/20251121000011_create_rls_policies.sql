-- Row Level Security (RLS) Policies
-- Enable RLS on all tables and create policies

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Families policies
CREATE POLICY "Users can view own families"
  ON families FOR SELECT
  USING (
    id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Creator can update family"
  ON families FOR UPDATE
  USING (created_by = auth.uid());

CREATE POLICY "Users can create families"
  ON families FOR INSERT
  WITH CHECK (created_by = auth.uid());

-- Family members policies
CREATE POLICY "Users can view family members"
  ON family_members FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join family"
  ON family_members FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own nickname"
  ON family_members FOR UPDATE
  USING (user_id = auth.uid());

-- Medications policies
CREATE POLICY "Users can view family medications"
  ON medications FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage family medications"
  ON medications FOR ALL
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- Medication logs policies
CREATE POLICY "Users can view family medication logs"
  ON medication_logs FOR SELECT
  USING (
    medication_id IN (
      SELECT id FROM medications WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage family medication logs"
  ON medication_logs FOR ALL
  USING (
    medication_id IN (
      SELECT id FROM medications WHERE family_id IN (
        SELECT family_id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

-- Vitals policies
CREATE POLICY "Users can view family vitals"
  ON vitals FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage family vitals"
  ON vitals FOR ALL
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- Health reports policies
CREATE POLICY "Users can view family reports"
  ON health_reports FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create family reports"
  ON health_reports FOR INSERT
  WITH CHECK (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- Products policies (public read)
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = TRUE);

-- Tasks policies
CREATE POLICY "Users can view family tasks"
  ON tasks FOR SELECT
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage family tasks"
  ON tasks FOR ALL
  USING (
    family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  );

-- Add comments
COMMENT ON POLICY "Users can view own data" ON users IS 'Users can only view their own profile';
COMMENT ON POLICY "Users can view own families" ON families IS 'Users can view families they belong to';
COMMENT ON POLICY "Users can view family medications" ON medications IS 'Users can view medications for their family members';
