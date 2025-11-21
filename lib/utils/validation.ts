import { z } from 'zod';

// User validation
export const userSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  full_name: z.string().min(1, '이름을 입력하세요').max(100),
  role: z.enum(['caregiver', 'patient']),
});

// Family validation
export const familySchema = z.object({
  name: z.string().min(1, '가족 이름을 입력하세요').max(100),
});

// Family member validation
export const familyMemberSchema = z.object({
  nickname: z.string().min(1, '별명을 입력하세요').max(50),
  relationship: z.enum(['self', 'parent', 'child', 'spouse', 'other']),
});

// Medication validation
export const medicationSchema = z.object({
  name: z.string().min(1, '약물명을 입력하세요').max(100),
  dosage: z.string().min(1, '용량을 입력하세요').max(50),
  frequency: z.string().min(1, '복용 빈도를 입력하세요').max(50),
  schedule_times: z
    .array(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, '시간 형식이 올바르지 않습니다'))
    .min(1, '최소 1개의 복용 시간을 입력하세요'),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다'),
  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다')
    .optional()
    .nullable(),
  notes: z.string().optional().nullable(),
});

// Vital validation
export const vitalSchema = z.object({
  type: z.enum(['blood_pressure', 'blood_sugar', 'weight', 'heart_rate']),
  value: z.string().min(1, '측정값을 입력하세요'),
  unit: z.string().min(1, '단위를 입력하세요'),
  measured_at: z.string().datetime('측정 시각 형식이 올바르지 않습니다'),
  notes: z.string().optional().nullable(),
});

// Blood pressure specific validation
export const bloodPressureSchema = vitalSchema.extend({
  type: z.literal('blood_pressure'),
  value: z.string().regex(/^\d{2,3}\/\d{2,3}$/, '혈압 형식이 올바르지 않습니다 (예: 122/80)'),
  unit: z.literal('mmHg'),
});

// Blood sugar specific validation
export const bloodSugarSchema = vitalSchema.extend({
  type: z.literal('blood_sugar'),
  value: z.string().regex(/^\d+$/, '혈당 형식이 올바르지 않습니다'),
  unit: z.literal('mg/dL'),
});

// Task validation
export const taskSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요').max(200),
  description: z.string().optional().nullable(),
  type: z.enum(['medication', 'vital', 'appointment', 'custom']),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다'),
  due_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, '시간 형식이 올바르지 않습니다')
    .optional()
    .nullable(),
});

// Report generation validation
export const generateReportSchema = z.object({
  member_id: z.string().uuid('유효한 구성원 ID가 아닙니다'),
  period_start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다'),
  period_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다'),
});
