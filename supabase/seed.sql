-- Seed data for CareNavi testing
-- This file populates the database with test data

-- Note: Users are managed by Supabase Auth
-- Create test users first via Supabase Dashboard or Auth API
-- Then insert into users table

-- Insert sample products (health store)
INSERT INTO products (name, description, category, price, external_link, rating, tags, is_active) VALUES
  ('오므론 자동 혈압계 HEM-7156', '가정용 자동 혈압계, 부정맥 감지 기능', 'device', 89000, 'https://www.coupang.com/vp/products/1234567', 4.5, '["혈압", "심혈관"]', TRUE),
  ('아큐첵 액티브 혈당측정기', '간편한 혈당 측정, 500회 메모리', 'device', 45000, 'https://www.coupang.com/vp/products/2345678', 4.7, '["혈당", "당뇨"]', TRUE),
  ('비타민 D3 5000IU', '뼈 건강과 면역력 증진', 'supplement', 25000, 'https://www.coupang.com/vp/products/3456789', 4.3, '["영양제", "비타민"]', TRUE),
  ('오메가3 EPA+DHA', '심혈관 건강 지원', 'supplement', 35000, 'https://www.coupang.com/vp/products/4567890', 4.6, '["영양제", "심혈관"]', TRUE),
  ('타니타 체중계 BC-731', '체성분 분석 기능 포함', 'device', 78000, 'https://www.coupang.com/vp/products/5678901', 4.4, '["체중", "건강측정"]', TRUE);

-- Note: The following seed data should be inserted AFTER creating test users via Supabase Auth
-- Example SQL to be run after user creation:

-- -- Insert test family
-- INSERT INTO families (name, created_by, invite_code) VALUES
--   ('김철수네 가족', '<user_id>', 'ABC12345');
--
-- -- Insert family members
-- INSERT INTO family_members (family_id, user_id, nickname, relationship, health_score, status) VALUES
--   ('<family_id>', '<user_id_1>', '아빠', 'self', 85, 'good'),
--   ('<family_id>', '<user_id_2>', '엄마', 'spouse', 78, 'fair'),
--   ('<family_id>', '<user_id_3>', '할머니', 'parent', 65, 'needs_review');
--
-- -- Insert sample medications
-- INSERT INTO medications (family_id, member_id, name, dosage, frequency, schedule_times, start_date, is_active) VALUES
--   ('<family_id>', '<member_id_3>', '혈압약 (아모디핀)', '5mg', '하루 1회', '["08:00"]', '2025-01-01', TRUE),
--   ('<family_id>', '<member_id_3>', '혈당약 (메트포민)', '500mg', '하루 2회', '["08:00", "20:00"]', '2025-01-01', TRUE),
--   ('<family_id>', '<member_id_2>', '비타민 D', '1000IU', '하루 1회', '["09:00"]', '2025-01-15', TRUE);
--
-- -- Insert sample medication logs (last 7 days)
-- INSERT INTO medication_logs (medication_id, scheduled_at, taken_at, status) VALUES
--   ('<medication_id_1>', NOW() - INTERVAL '1 day' + TIME '08:00', NOW() - INTERVAL '1 day' + TIME '08:15', 'taken'),
--   ('<medication_id_1>', NOW() + TIME '08:00', NULL, 'pending'),
--   ('<medication_id_2>', NOW() - INTERVAL '1 day' + TIME '08:00', NOW() - INTERVAL '1 day' + TIME '08:10', 'taken'),
--   ('<medication_id_2>', NOW() - INTERVAL '1 day' + TIME '20:00', NULL, 'skipped');
--
-- -- Insert sample vitals (last 30 days)
-- INSERT INTO vitals (family_id, member_id, type, value, unit, measured_at) VALUES
--   ('<family_id>', '<member_id_3>', 'blood_pressure', '122/80', 'mmHg', NOW() - INTERVAL '1 day'),
--   ('<family_id>', '<member_id_3>', 'blood_pressure', '125/82', 'mmHg', NOW() - INTERVAL '2 days'),
--   ('<family_id>', '<member_id_3>', 'blood_sugar', '95', 'mg/dL', NOW() - INTERVAL '1 day'),
--   ('<family_id>', '<member_id_3>', 'blood_sugar', '102', 'mg/dL', NOW() - INTERVAL '2 days'),
--   ('<family_id>', '<member_id_2>', 'weight', '58.5', 'kg', NOW() - INTERVAL '7 days');
--
-- -- Insert sample tasks (today)
-- INSERT INTO tasks (family_id, member_id, title, type, due_date, due_time, completed) VALUES
--   ('<family_id>', '<member_id_3>', '혈압약 복용', 'medication', CURRENT_DATE, '08:00', FALSE),
--   ('<family_id>', '<member_id_3>', '혈당 측정', 'vital', CURRENT_DATE, '07:00', TRUE),
--   ('<family_id>', '<member_id_2>', '비타민 D 복용', 'medication', CURRENT_DATE, '09:00', FALSE);

COMMENT ON TABLE products IS 'Seeded with 5 sample health products';
