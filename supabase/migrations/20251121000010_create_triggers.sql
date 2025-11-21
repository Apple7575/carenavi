-- Database triggers and functions

-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Generate invite code for families
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function: Calculate health score for family member
CREATE OR REPLACE FUNCTION calculate_health_score(member_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  medication_score INTEGER := 0;
  vital_score INTEGER := 0;
  final_score INTEGER;
BEGIN
  -- Medication adherence score (0-50 points, last 30 days)
  SELECT COALESCE(
    ROUND(
      (COUNT(*) FILTER (WHERE status = 'taken')::DECIMAL /
       NULLIF(COUNT(*) FILTER (WHERE status IN ('taken', 'skipped')), 0)) * 50
    ), 0
  )::INTEGER
  INTO medication_score
  FROM medication_logs ml
  JOIN medications m ON ml.medication_id = m.id
  WHERE m.member_id = member_uuid
    AND ml.scheduled_at >= NOW() - INTERVAL '30 days';

  -- Vital score (0-50 points, last 30 days)
  SELECT COALESCE(
    (
      CASE WHEN bp_normal THEN 25 ELSE 0 END +
      CASE WHEN bs_normal THEN 25 ELSE 0 END
    ), 0
  )
  INTO vital_score
  FROM (
    SELECT
      -- Blood pressure: systolic < 140, diastolic < 90
      AVG(
        CASE WHEN type = 'blood_pressure' THEN
          CASE WHEN
            split_part(value, '/', 1)::INTEGER < 140 AND
            split_part(value, '/', 2)::INTEGER < 90
          THEN 1 ELSE 0 END
        ELSE NULL END
      ) > 0.7 AS bp_normal,
      -- Blood sugar: < 126
      AVG(
        CASE WHEN type = 'blood_sugar' THEN
          CASE WHEN value::INTEGER < 126 THEN 1 ELSE 0 END
        ELSE NULL END
      ) > 0.7 AS bs_normal
    FROM vitals
    WHERE member_id = member_uuid
      AND measured_at >= NOW() - INTERVAL '30 days'
  ) v;

  final_score := LEAST(medication_score + vital_score, 100);

  -- Update family_members table
  UPDATE family_members
  SET
    health_score = final_score,
    status = CASE
      WHEN final_score >= 80 THEN 'good'
      WHEN final_score >= 60 THEN 'fair'
      ELSE 'needs_review'
    END
  WHERE id = member_uuid;

  RETURN final_score;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_families_updated_at
  BEFORE UPDATE ON families
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_members_updated_at
  BEFORE UPDATE ON family_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medications_updated_at
  BEFORE UPDATE ON medications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medication_logs_updated_at
  BEFORE UPDATE ON medication_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vitals_updated_at
  BEFORE UPDATE ON vitals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_reports_updated_at
  BEFORE UPDATE ON health_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Set default invite code generation for families
ALTER TABLE families
  ALTER COLUMN invite_code SET DEFAULT generate_invite_code();

-- Add comments
COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically update updated_at timestamp';
COMMENT ON FUNCTION generate_invite_code() IS 'Generate 8-character invite code for families';
COMMENT ON FUNCTION calculate_health_score(UUID) IS 'Calculate health score based on medication adherence and vitals';
