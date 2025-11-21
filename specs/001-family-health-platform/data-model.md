# Data Model: 가족 건강 관리 웹 플랫폼

**Feature**: 001-family-health-platform
**Date**: 2025-11-21
**Status**: Draft
**Related**: [spec.md](./spec.md) | [plan.md](./plan.md)

## Summary

CareNavi의 데이터 모델은 9개 핵심 엔티티로 구성되며, Supabase PostgreSQL에 저장됩니다. Row Level Security (RLS)를 통해 가족별 데이터 격리를 보장하고, 관계형 무결성을 유지합니다.

**핵심 설계 원칙**:
- 가족(Family) 중심 데이터 모델
- RLS를 통한 Multi-tenancy 구현
- 타임스탬프 자동 관리 (created_at, updated_at)
- Soft delete 패턴 (deleted_at)
- UUID 기본키 사용

## Entity Relationship Diagram

```
┌─────────────┐
│    User     │ 1
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────────┐
│  FamilyMember   │ N:1    ┌──────────┐
│  (join table)   │───────▶│  Family  │
└──────┬──────────┘        └─────┬────┘
       │                         │
       │ 1:N                     │ 1:N
       │                         │
  ┌────▼─────┬───────────────────┴──────┬──────────┐
  │          │                          │          │
┌─▼─────┐ ┌─▼────────┐ ┌──────────┐ ┌─▼────────┐ ┌─────────┐
│Medica-│ │Medica-   │ │  Vital   │ │  Health  │ │  Task   │
│tion   │ │tionLog   │ │          │ │  Report  │ │         │
└───────┘ └──────────┘ └──────────┘ └──────────┘ └─────────┘
                                         │
                                         │ M:N
                                         │
                                    ┌────▼────┐
                                    │ Product │
                                    └─────────┘
```

## Entities

### 1. User (사용자)

**설명**: 시스템에 로그인하는 실제 사용자 (Supabase Auth와 연동)

**테이블명**: `users`

**필드**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | uuid | PK, FK → auth.users.id | Supabase Auth 사용자 ID |
| email | varchar(255) | UNIQUE, NOT NULL | 이메일 주소 |
| full_name | varchar(100) | NOT NULL | 전체 이름 |
| avatar_url | text | NULLABLE | 프로필 이미지 URL |
| role | varchar(20) | NOT NULL, DEFAULT 'caregiver' | 'caregiver' \| 'patient' |
| preferences | jsonb | DEFAULT '{}' | 사용자 설정 (언어, 알림 등) |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 수정 시각 |

**인덱스**:
- `idx_users_email` ON email

**RLS 정책**:
```sql
-- Users can only read/update their own data
CREATE POLICY "Users can view own data"
ON users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
ON users FOR UPDATE
USING (auth.uid() = id);
```

**Validation**:
- email: 유효한 이메일 형식
- role: enum ['caregiver', 'patient']
- full_name: 1-100자

---

### 2. Family (가족 그룹)

**설명**: 여러 사용자가 건강 데이터를 공유하는 가족 단위

**테이블명**: `families`

**필드**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | uuid | PK, DEFAULT gen_random_uuid() | 가족 ID |
| name | varchar(100) | NOT NULL | 가족 이름 (예: "김철수네 가족") |
| created_by | uuid | FK → users.id, NOT NULL | 생성자 (가족 관리자) |
| invite_code | varchar(20) | UNIQUE, NOT NULL | 초대 코드 (8자 랜덤) |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 수정 시각 |

**인덱스**:
- `idx_families_invite_code` ON invite_code
- `idx_families_created_by` ON created_by

**RLS 정책**:
```sql
-- Users can view families they belong to
CREATE POLICY "Users can view own families"
ON families FOR SELECT
USING (
  id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);

-- Only family creator can update family
CREATE POLICY "Creator can update family"
ON families FOR UPDATE
USING (created_by = auth.uid());
```

**Validation**:
- name: 1-100자
- invite_code: 8자 영숫자

---

### 3. FamilyMember (가족 구성원)

**설명**: User와 Family를 연결하는 중간 테이블 (join table)

**테이블명**: `family_members`

**필드**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | uuid | PK, DEFAULT gen_random_uuid() | 구성원 ID |
| family_id | uuid | FK → families.id, NOT NULL | 가족 ID |
| user_id | uuid | FK → users.id, NOT NULL | 사용자 ID |
| nickname | varchar(50) | NOT NULL | 가족 내 별명 (예: "엄마", "아빠") |
| relationship | varchar(20) | NOT NULL | 관계 ('self' \| 'parent' \| 'child' \| 'spouse' \| 'other') |
| health_score | integer | CHECK (health_score >= 0 AND health_score <= 100) | 건강 점수 (0-100) |
| status | varchar(20) | NOT NULL, DEFAULT 'good' | 'good' \| 'fair' \| 'needs_review' |
| joined_at | timestamptz | NOT NULL, DEFAULT now() | 가입 시각 |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 수정 시각 |

**제약조건**:
- UNIQUE (family_id, user_id) - 한 사용자는 같은 가족에 한 번만 속함

**인덱스**:
- `idx_family_members_family_id` ON family_id
- `idx_family_members_user_id` ON user_id

**RLS 정책**:
```sql
-- Users can view family members of their families
CREATE POLICY "Users can view family members"
ON family_members FOR SELECT
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);

-- Users can insert themselves into a family (via invite code)
CREATE POLICY "Users can join family"
ON family_members FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Users can update their own nickname
CREATE POLICY "Users can update own nickname"
ON family_members FOR UPDATE
USING (user_id = auth.uid());
```

**Validation**:
- nickname: 1-50자
- relationship: enum ['self', 'parent', 'child', 'spouse', 'other']
- health_score: 0-100
- status: enum ['good', 'fair', 'needs_review']

---

### 4. Medication (약물)

**설명**: 가족 구성원이 복용하는 약물 정보

**테이블명**: `medications`

**필드**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | uuid | PK, DEFAULT gen_random_uuid() | 약물 ID |
| family_id | uuid | FK → families.id, NOT NULL | 가족 ID |
| member_id | uuid | FK → family_members.id, NOT NULL | 복용자 ID |
| name | varchar(100) | NOT NULL | 약물명 |
| dosage | varchar(50) | NOT NULL | 용량 (예: "500mg") |
| frequency | varchar(50) | NOT NULL | 복용 빈도 (예: "하루 2회") |
| schedule_times | jsonb | NOT NULL | 복용 시간 배열 (예: ["09:00", "21:00"]) |
| start_date | date | NOT NULL | 복용 시작일 |
| end_date | date | NULLABLE | 복용 종료일 (NULL = 무기한) |
| notes | text | NULLABLE | 메모 |
| is_active | boolean | NOT NULL, DEFAULT true | 활성 상태 |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 수정 시각 |

**인덱스**:
- `idx_medications_family_id` ON family_id
- `idx_medications_member_id` ON member_id
- `idx_medications_active` ON is_active WHERE is_active = true

**RLS 정책**:
```sql
-- Users can view medications of their family members
CREATE POLICY "Users can view family medications"
ON medications FOR SELECT
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);

-- Users can insert/update/delete medications for their family
CREATE POLICY "Users can manage family medications"
ON medications FOR ALL
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);
```

**Validation**:
- name: 1-100자
- dosage: 1-50자
- frequency: 1-50자
- schedule_times: JSON 배열, 각 항목은 "HH:MM" 형식
- start_date ≤ end_date (if end_date is not null)

---

### 5. MedicationLog (약물 복용 기록)

**설명**: 약물 복용 여부를 추적하는 로그

**테이블명**: `medication_logs`

**필드**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | uuid | PK, DEFAULT gen_random_uuid() | 로그 ID |
| medication_id | uuid | FK → medications.id, NOT NULL | 약물 ID |
| scheduled_at | timestamptz | NOT NULL | 예정 복용 시각 |
| taken_at | timestamptz | NULLABLE | 실제 복용 시각 (NULL = 미복용) |
| status | varchar(20) | NOT NULL, DEFAULT 'pending' | 'pending' \| 'taken' \| 'skipped' |
| notes | text | NULLABLE | 메모 (예: "식사 후 복용") |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 수정 시각 |

**제약조건**:
- CHECK (status = 'taken' AND taken_at IS NOT NULL OR status != 'taken')

**인덱스**:
- `idx_medication_logs_medication_id` ON medication_id
- `idx_medication_logs_scheduled_at` ON scheduled_at
- `idx_medication_logs_status` ON status

**RLS 정책**:
```sql
-- Users can view logs of their family medications
CREATE POLICY "Users can view family medication logs"
ON medication_logs FOR SELECT
USING (
  medication_id IN (
    SELECT id FROM medications WHERE family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  )
);

-- Users can manage logs for their family medications
CREATE POLICY "Users can manage family medication logs"
ON medication_logs FOR ALL
USING (
  medication_id IN (
    SELECT id FROM medications WHERE family_id IN (
      SELECT family_id FROM family_members WHERE user_id = auth.uid()
    )
  )
);
```

**Validation**:
- status: enum ['pending', 'taken', 'skipped']
- taken_at: 필수 (if status = 'taken')

**Business Logic**:
- 자동 생성: medications.schedule_times 기반으로 매일 새로운 로그 생성 (서버 크론잡 또는 Supabase Edge Function)
- 준수율 계산: (taken / (taken + skipped)) * 100

---

### 6. Vital (바이탈 측정값)

**설명**: 혈압, 혈당 등 건강 지표 측정값

**테이블명**: `vitals`

**필드**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | uuid | PK, DEFAULT gen_random_uuid() | 바이탈 ID |
| family_id | uuid | FK → families.id, NOT NULL | 가족 ID |
| member_id | uuid | FK → family_members.id, NOT NULL | 측정 대상자 ID |
| type | varchar(50) | NOT NULL | 'blood_pressure' \| 'blood_sugar' \| 'weight' \| 'heart_rate' |
| value | varchar(50) | NOT NULL | 측정값 (예: "122/80", "95", "70.5") |
| unit | varchar(20) | NOT NULL | 단위 (예: "mmHg", "mg/dL", "kg", "bpm") |
| measured_at | timestamptz | NOT NULL | 측정 시각 |
| notes | text | NULLABLE | 메모 |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 수정 시각 |

**인덱스**:
- `idx_vitals_family_id` ON family_id
- `idx_vitals_member_id` ON member_id
- `idx_vitals_type_measured_at` ON (type, measured_at DESC)

**RLS 정책**:
```sql
-- Users can view vitals of their family members
CREATE POLICY "Users can view family vitals"
ON vitals FOR SELECT
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);

-- Users can manage vitals for their family
CREATE POLICY "Users can manage family vitals"
ON vitals FOR ALL
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);
```

**Validation**:
- type: enum ['blood_pressure', 'blood_sugar', 'weight', 'heart_rate']
- value: type별 형식 검증
  - blood_pressure: "숫자/숫자" (예: "122/80")
  - blood_sugar: 숫자 (예: "95")
  - weight: 숫자 (예: "70.5")
  - heart_rate: 숫자 (예: "72")
- unit: type별 허용 단위
  - blood_pressure: "mmHg"
  - blood_sugar: "mg/dL"
  - weight: "kg"
  - heart_rate: "bpm"

---

### 7. HealthReport (건강 리포트)

**설명**: AI가 생성한 가족 구성원별 건강 리포트

**테이블명**: `health_reports`

**필드**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | uuid | PK, DEFAULT gen_random_uuid() | 리포트 ID |
| family_id | uuid | FK → families.id, NOT NULL | 가족 ID |
| member_id | uuid | FK → family_members.id, NOT NULL | 대상자 ID |
| title | varchar(200) | NOT NULL | 리포트 제목 |
| summary | text | NOT NULL | 요약 (markdown) |
| content | jsonb | NOT NULL | 상세 내용 (구조화된 JSON) |
| insights | jsonb | NULLABLE | AI 인사이트 배열 |
| recommendations | jsonb | NULLABLE | 추천 제품 ID 배열 |
| period_start | date | NOT NULL | 분석 기간 시작일 |
| period_end | date | NOT NULL | 분석 기간 종료일 |
| generated_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 수정 시각 |

**제약조건**:
- CHECK (period_start <= period_end)

**인덱스**:
- `idx_health_reports_family_id` ON family_id
- `idx_health_reports_member_id` ON member_id
- `idx_health_reports_generated_at` ON generated_at DESC

**RLS 정책**:
```sql
-- Users can view reports of their family members
CREATE POLICY "Users can view family reports"
ON health_reports FOR SELECT
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);

-- Users can insert reports for their family (AI 생성 후)
CREATE POLICY "Users can create family reports"
ON health_reports FOR INSERT
WITH CHECK (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);
```

**Validation**:
- title: 1-200자
- summary: markdown 형식
- content: JSON schema 검증
- period_start ≤ period_end

**JSON Schema (content)**:
```json
{
  "medication_adherence": {
    "rate": 85,
    "trend": "improving"
  },
  "vitals_summary": {
    "blood_pressure": {
      "average": "125/82",
      "trend": "stable"
    },
    "blood_sugar": {
      "average": 98,
      "trend": "decreasing"
    }
  },
  "alerts": [
    {
      "type": "warning",
      "message": "혈압이 지난주보다 5mmHg 상승했습니다"
    }
  ]
}
```

---

### 8. Product (건강 제품)

**설명**: 건강 스토어에서 판매하는 제품 (영양제, 건강기기 등)

**테이블명**: `products`

**필드**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | uuid | PK, DEFAULT gen_random_uuid() | 제품 ID |
| name | varchar(200) | NOT NULL | 제품명 |
| description | text | NOT NULL | 설명 |
| category | varchar(50) | NOT NULL | 'supplement' \| 'device' \| 'service' |
| price | decimal(10, 2) | NOT NULL, CHECK (price >= 0) | 가격 (원) |
| image_url | text | NULLABLE | 제품 이미지 URL |
| external_link | text | NOT NULL | 구매 링크 (외부 쇼핑몰) |
| rating | decimal(2, 1) | CHECK (rating >= 0 AND rating <= 5) | 평점 (0-5) |
| tags | jsonb | DEFAULT '[]' | 태그 배열 (예: ["혈압", "심혈관"]) |
| is_active | boolean | NOT NULL, DEFAULT true | 활성 상태 |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 수정 시각 |

**인덱스**:
- `idx_products_category` ON category
- `idx_products_active` ON is_active WHERE is_active = true
- `idx_products_tags` ON tags USING GIN

**RLS 정책**:
```sql
-- All users can view active products
CREATE POLICY "Anyone can view active products"
ON products FOR SELECT
USING (is_active = true);
```

**Validation**:
- name: 1-200자
- category: enum ['supplement', 'device', 'service']
- price: >= 0
- rating: 0-5
- external_link: 유효한 URL

---

### 9. Task (할 일)

**설명**: 오늘의 할 일 (약 복용, 바이탈 측정 등)

**테이블명**: `tasks`

**필드**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | uuid | PK, DEFAULT gen_random_uuid() | 태스크 ID |
| family_id | uuid | FK → families.id, NOT NULL | 가족 ID |
| member_id | uuid | FK → family_members.id, NOT NULL | 담당자 ID |
| title | varchar(200) | NOT NULL | 제목 |
| description | text | NULLABLE | 설명 |
| type | varchar(50) | NOT NULL | 'medication' \| 'vital' \| 'appointment' \| 'custom' |
| reference_id | uuid | NULLABLE | 연관 엔티티 ID (medication_id 또는 vital_id) |
| due_date | date | NOT NULL | 마감일 |
| due_time | time | NULLABLE | 마감 시각 |
| completed | boolean | NOT NULL, DEFAULT false | 완료 여부 |
| completed_at | timestamptz | NULLABLE | 완료 시각 |
| created_at | timestamptz | NOT NULL, DEFAULT now() | 생성 시각 |
| updated_at | timestamptz | NOT NULL, DEFAULT now() | 수정 시각 |

**인덱스**:
- `idx_tasks_family_id` ON family_id
- `idx_tasks_member_id` ON member_id
- `idx_tasks_due_date_completed` ON (due_date, completed)

**RLS 정책**:
```sql
-- Users can view tasks of their family members
CREATE POLICY "Users can view family tasks"
ON tasks FOR SELECT
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);

-- Users can manage tasks for their family
CREATE POLICY "Users can manage family tasks"
ON tasks FOR ALL
USING (
  family_id IN (
    SELECT family_id FROM family_members WHERE user_id = auth.uid()
  )
);
```

**Validation**:
- title: 1-200자
- type: enum ['medication', 'vital', 'appointment', 'custom']
- completed_at: 필수 (if completed = true)

**Business Logic**:
- 자동 생성: medication_logs 기반으로 매일 새로운 태스크 생성
- 자동 완료: medication_logs.status = 'taken'이면 해당 task.completed = true

---

## Relationships Summary

| 관계 | From | To | Type | 설명 |
|------|------|-----|------|------|
| R1 | User | FamilyMember | 1:N | 한 사용자는 여러 가족에 속할 수 있음 |
| R2 | Family | FamilyMember | 1:N | 한 가족은 여러 구성원을 가짐 |
| R3 | FamilyMember | Medication | 1:N | 한 구성원은 여러 약물을 복용 |
| R4 | Medication | MedicationLog | 1:N | 한 약물은 여러 복용 기록을 가짐 |
| R5 | FamilyMember | Vital | 1:N | 한 구성원은 여러 바이탈 측정값을 가짐 |
| R6 | FamilyMember | HealthReport | 1:N | 한 구성원은 여러 리포트를 가짐 |
| R7 | HealthReport | Product | M:N | 리포트는 여러 제품을 추천 (JSON 배열) |
| R8 | FamilyMember | Task | 1:N | 한 구성원은 여러 태스크를 가짐 |

## Database Triggers & Functions

### 1. Auto-update `updated_at` Trigger

모든 테이블에 적용:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 각 테이블마다 트리거 생성
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_families_updated_at BEFORE UPDATE ON families
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ... (모든 테이블에 동일하게 적용)
```

### 2. Generate Invite Code Function

```sql
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- 혼동 방지 (I, O, 0, 1 제외)
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- families 테이블에 기본값 설정
ALTER TABLE families
ALTER COLUMN invite_code SET DEFAULT generate_invite_code();
```

### 3. Calculate Health Score Function

구성원의 건강 점수를 계산 (약물 준수율 + 바이탈 정상 범위):

```sql
CREATE OR REPLACE FUNCTION calculate_health_score(member_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  medication_score INTEGER := 0;
  vital_score INTEGER := 0;
  final_score INTEGER;
BEGIN
  -- 약물 준수율 (최근 30일, 0-50점)
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

  -- 바이탈 정상 범위 (최근 30일, 0-50점)
  -- 간단한 예시: 혈압과 혈당이 정상 범위에 있으면 각 25점
  SELECT COALESCE(
    (
      CASE WHEN bp_normal THEN 25 ELSE 0 END +
      CASE WHEN bs_normal THEN 25 ELSE 0 END
    ), 0
  )
  INTO vital_score
  FROM (
    SELECT
      -- 혈압: 수축기 < 140, 이완기 < 90
      AVG(
        CASE WHEN type = 'blood_pressure' THEN
          CASE WHEN
            split_part(value, '/', 1)::INTEGER < 140 AND
            split_part(value, '/', 2)::INTEGER < 90
          THEN 1 ELSE 0 END
        ELSE NULL END
      ) > 0.7 AS bp_normal,
      -- 혈당: < 126
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

  -- family_members 테이블 업데이트
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
```

## Migration Order

테이블 생성 순서 (외래키 의존성):

1. `users` (Supabase Auth 의존)
2. `families`
3. `family_members` (users, families 의존)
4. `medications` (families, family_members 의존)
5. `medication_logs` (medications 의존)
6. `vitals` (families, family_members 의존)
7. `health_reports` (families, family_members 의존)
8. `products` (독립)
9. `tasks` (families, family_members 의존)

## Seeding Strategy

초기 데이터:

1. **products**: 5-10개 샘플 제품 (영양제, 혈압계 등)
2. **users**: 테스트 사용자 3명 (caregiver 2명, patient 1명)
3. **families**: 테스트 가족 1개
4. **family_members**: 테스트 가족에 3명 추가
5. **medications**: 가족 구성원별 2-3개 약물
6. **medication_logs**: 최근 7일 로그
7. **vitals**: 최근 30일 바이탈 데이터
8. **health_reports**: 1개 샘플 리포트
9. **tasks**: 오늘 할 일 5개

## TypeScript Types

Supabase CLI로 자동 생성:

```bash
npx supabase gen types typescript --project-id [PROJECT_ID] > types/database.ts
```

생성된 타입 예시:

```typescript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: 'caregiver' | 'patient';
          preferences: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          role?: 'caregiver' | 'patient';
          preferences?: Json;
        };
        Update: {
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: 'caregiver' | 'patient';
          preferences?: Json;
        };
      };
      // ... (모든 테이블)
    };
  };
};
```

## Next Steps

1. Supabase 마이그레이션 파일 생성 (`supabase/migrations/`)
2. RLS 정책 테스트
3. API 계약 정의 (`contracts/rest-api.yaml`)
4. TypeScript 타입 생성 및 검증
5. 시드 데이터 준비 (`supabase/seed.sql`)
