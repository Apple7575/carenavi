/**
 * CareNavi TypeScript Type Definitions
 *
 * 이 파일은 API 요청/응답 및 도메인 엔티티의 TypeScript 타입을 정의합니다.
 * Supabase Database 타입과 함께 사용됩니다.
 *
 * @version 1.0.0
 * @date 2025-11-21
 */

// ============================================================================
// Common Types
// ============================================================================

export type UUID = string;
export type ISODateString = string; // YYYY-MM-DD
export type ISODateTimeString = string; // ISO 8601 format
export type TimeString = string; // HH:MM format

// ============================================================================
// Domain Enums
// ============================================================================

export enum UserRole {
  Caregiver = 'caregiver',
  Patient = 'patient',
}

export enum Relationship {
  Self = 'self',
  Parent = 'parent',
  Child = 'child',
  Spouse = 'spouse',
  Other = 'other',
}

export enum HealthStatus {
  Good = 'good',
  Fair = 'fair',
  NeedsReview = 'needs_review',
}

export enum MedicationLogStatus {
  Pending = 'pending',
  Taken = 'taken',
  Skipped = 'skipped',
}

export enum VitalType {
  BloodPressure = 'blood_pressure',
  BloodSugar = 'blood_sugar',
  Weight = 'weight',
  HeartRate = 'heart_rate',
}

export enum ProductCategory {
  Supplement = 'supplement',
  Device = 'device',
  Service = 'service',
}

export enum TaskType {
  Medication = 'medication',
  Vital = 'vital',
  Appointment = 'appointment',
  Custom = 'custom',
}

export enum TrendDirection {
  Improving = 'improving',
  Stable = 'stable',
  Declining = 'declining',
}

export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

// ============================================================================
// Entity Types (Database Row Types)
// ============================================================================

export interface User {
  id: UUID;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  preferences: Record<string, unknown>;
  created_at: ISODateTimeString;
  updated_at: ISODateTimeString;
}

export interface Family {
  id: UUID;
  name: string;
  created_by: UUID;
  invite_code: string;
  created_at: ISODateTimeString;
  updated_at: ISODateTimeString;
}

export interface FamilyMember {
  id: UUID;
  family_id: UUID;
  user_id: UUID;
  nickname: string;
  relationship: Relationship;
  health_score: number | null;
  status: HealthStatus;
  joined_at: ISODateTimeString;
  created_at: ISODateTimeString;
  updated_at: ISODateTimeString;
}

export interface Medication {
  id: UUID;
  family_id: UUID;
  member_id: UUID;
  name: string;
  dosage: string;
  frequency: string;
  schedule_times: TimeString[];
  start_date: ISODateString;
  end_date: ISODateString | null;
  notes: string | null;
  is_active: boolean;
  created_at: ISODateTimeString;
  updated_at: ISODateTimeString;
}

export interface MedicationLog {
  id: UUID;
  medication_id: UUID;
  scheduled_at: ISODateTimeString;
  taken_at: ISODateTimeString | null;
  status: MedicationLogStatus;
  notes: string | null;
  created_at: ISODateTimeString;
  updated_at: ISODateTimeString;
}

export interface Vital {
  id: UUID;
  family_id: UUID;
  member_id: UUID;
  type: VitalType;
  value: string;
  unit: string;
  measured_at: ISODateTimeString;
  notes: string | null;
  created_at: ISODateTimeString;
  updated_at: ISODateTimeString;
}

export interface HealthReportContent {
  medication_adherence: {
    rate: number;
    trend: TrendDirection;
  };
  vitals_summary: {
    [key: string]: {
      average: string | number;
      trend: TrendDirection;
    };
  };
  alerts: Array<{
    type: AlertType;
    message: string;
  }>;
}

export interface HealthReport {
  id: UUID;
  family_id: UUID;
  member_id: UUID;
  title: string;
  summary: string;
  content: HealthReportContent;
  insights: string[] | null;
  recommendations: UUID[] | null; // Product IDs
  period_start: ISODateString;
  period_end: ISODateString;
  generated_at: ISODateTimeString;
  created_at: ISODateTimeString;
  updated_at: ISODateTimeString;
}

export interface Product {
  id: UUID;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  image_url: string | null;
  external_link: string;
  rating: number | null;
  tags: string[];
  is_active: boolean;
  created_at: ISODateTimeString;
  updated_at: ISODateTimeString;
}

export interface Task {
  id: UUID;
  family_id: UUID;
  member_id: UUID;
  title: string;
  description: string | null;
  type: TaskType;
  reference_id: UUID | null;
  due_date: ISODateString;
  due_time: TimeString | null;
  completed: boolean;
  completed_at: ISODateTimeString | null;
  created_at: ISODateTimeString;
  updated_at: ISODateTimeString;
}

// ============================================================================
// API Request Types
// ============================================================================

export interface CreateFamilyRequest {
  name: string;
}

export interface JoinFamilyRequest {
  nickname: string;
  relationship: Relationship;
}

export interface UpdateProfileRequest {
  full_name?: string;
  avatar_url?: string | null;
  preferences?: Record<string, unknown>;
}

export interface CreateMedicationRequest {
  family_id: UUID;
  member_id: UUID;
  name: string;
  dosage: string;
  frequency: string;
  schedule_times: TimeString[];
  start_date: ISODateString;
  end_date?: ISODateString | null;
  notes?: string | null;
}

export interface UpdateMedicationRequest {
  name?: string;
  dosage?: string;
  frequency?: string;
  schedule_times?: TimeString[];
  end_date?: ISODateString | null;
  notes?: string | null;
  is_active?: boolean;
}

export interface UpdateMedicationLogRequest {
  status: MedicationLogStatus.Taken | MedicationLogStatus.Skipped;
  taken_at?: ISODateTimeString;
  notes?: string | null;
}

export interface CreateVitalRequest {
  family_id: UUID;
  member_id: UUID;
  type: VitalType;
  value: string;
  unit: string;
  measured_at: ISODateTimeString;
  notes?: string | null;
}

export interface GenerateReportRequest {
  member_id: UUID;
  period_start: ISODateString;
  period_end: ISODateString;
}

export interface UpdateTaskRequest {
  completed: boolean;
  completed_at?: ISODateTimeString;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

// ============================================================================
// Composite Types (with Relations)
// ============================================================================

export interface FamilyMemberWithUser extends FamilyMember {
  user: User;
}

export interface MedicationWithLogs extends Medication {
  logs: MedicationLog[];
  adherence_rate: number; // 0-100
}

export interface VitalTrendData {
  date: ISODateString;
  value: number | string;
}

export interface VitalsQuickView {
  blood_pressure: {
    latest: Vital | null;
    trend: VitalTrendData[];
  };
  blood_sugar: {
    latest: Vital | null;
    trend: VitalTrendData[];
  };
}

export interface DashboardSummary {
  user: User;
  family: Family;
  today_tasks: Task[];
  family_overview: FamilyMemberWithUser[];
  vitals_quick_view: VitalsQuickView;
}

export interface HealthReportWithProducts extends HealthReport {
  recommended_products: Product[];
}

// ============================================================================
// Validation Helpers
// ============================================================================

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  timeString: /^([01]\d|2[0-3]):([0-5]\d)$/,
  inviteCode: /^[A-Z2-9]{8}$/,
  bloodPressure: /^\d{2,3}\/\d{2,3}$/,
} as const;

export const HEALTH_SCORE = {
  MIN: 0,
  MAX: 100,
  GOOD_THRESHOLD: 80,
  FAIR_THRESHOLD: 60,
} as const;

export const VITAL_RANGES = {
  blood_pressure: {
    systolic: { min: 90, max: 140 },
    diastolic: { min: 60, max: 90 },
  },
  blood_sugar: {
    fasting: { min: 70, max: 126 },
  },
  heart_rate: {
    resting: { min: 60, max: 100 },
  },
} as const;

// ============================================================================
// Type Guards
// ============================================================================

export function isUserRole(value: string): value is UserRole {
  return Object.values(UserRole).includes(value as UserRole);
}

export function isRelationship(value: string): value is Relationship {
  return Object.values(Relationship).includes(value as Relationship);
}

export function isHealthStatus(value: string): value is HealthStatus {
  return Object.values(HealthStatus).includes(value as HealthStatus);
}

export function isMedicationLogStatus(value: string): value is MedicationLogStatus {
  return Object.values(MedicationLogStatus).includes(value as MedicationLogStatus);
}

export function isVitalType(value: string): value is VitalType {
  return Object.values(VitalType).includes(value as VitalType);
}

export function isProductCategory(value: string): value is ProductCategory {
  return Object.values(ProductCategory).includes(value as ProductCategory);
}

export function isTaskType(value: string): value is TaskType {
  return Object.values(TaskType).includes(value as TaskType);
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * 혈압 문자열을 수축기/이완기로 파싱
 */
export function parseBloodPressure(value: string): {
  systolic: number;
  diastolic: number;
} | null {
  const match = value.match(/^(\d{2,3})\/(\d{2,3})$/);
  if (!match) return null;

  return {
    systolic: parseInt(match[1], 10),
    diastolic: parseInt(match[2], 10),
  };
}

/**
 * 건강 점수 기반으로 상태 결정
 */
export function getHealthStatusFromScore(score: number): HealthStatus {
  if (score >= HEALTH_SCORE.GOOD_THRESHOLD) return HealthStatus.Good;
  if (score >= HEALTH_SCORE.FAIR_THRESHOLD) return HealthStatus.Fair;
  return HealthStatus.NeedsReview;
}

/**
 * 약물 준수율 계산
 */
export function calculateAdherenceRate(logs: MedicationLog[]): number {
  const completedLogs = logs.filter(
    (log) => log.status === MedicationLogStatus.Taken || log.status === MedicationLogStatus.Skipped
  );

  if (completedLogs.length === 0) return 0;

  const takenCount = completedLogs.filter((log) => log.status === MedicationLogStatus.Taken).length;

  return Math.round((takenCount / completedLogs.length) * 100);
}

/**
 * 바이탈 값이 정상 범위인지 확인
 */
export function isVitalInNormalRange(vital: Vital): boolean {
  switch (vital.type) {
    case VitalType.BloodPressure: {
      const bp = parseBloodPressure(vital.value);
      if (!bp) return false;

      return (
        bp.systolic >= VITAL_RANGES.blood_pressure.systolic.min &&
        bp.systolic <= VITAL_RANGES.blood_pressure.systolic.max &&
        bp.diastolic >= VITAL_RANGES.blood_pressure.diastolic.min &&
        bp.diastolic <= VITAL_RANGES.blood_pressure.diastolic.max
      );
    }

    case VitalType.BloodSugar: {
      const value = parseInt(vital.value, 10);
      return (
        value >= VITAL_RANGES.blood_sugar.fasting.min &&
        value <= VITAL_RANGES.blood_sugar.fasting.max
      );
    }

    case VitalType.HeartRate: {
      const value = parseInt(vital.value, 10);
      return (
        value >= VITAL_RANGES.heart_rate.resting.min &&
        value <= VITAL_RANGES.heart_rate.resting.max
      );
    }

    default:
      return true; // Weight는 범위 체크 안 함
  }
}

/**
 * 시간 문자열 검증
 */
export function isValidTimeString(time: string): boolean {
  return VALIDATION_RULES.timeString.test(time);
}

/**
 * 초대 코드 검증
 */
export function isValidInviteCode(code: string): boolean {
  return VALIDATION_RULES.inviteCode.test(code);
}

// ============================================================================
// Mock Data Helpers (for development/testing)
// ============================================================================

export function createMockUser(overrides?: Partial<User>): User {
  return {
    id: crypto.randomUUID(),
    email: 'user@example.com',
    full_name: '김철수',
    avatar_url: null,
    role: UserRole.Caregiver,
    preferences: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockFamily(overrides?: Partial<Family>): Family {
  return {
    id: crypto.randomUUID(),
    name: '김철수네 가족',
    created_by: crypto.randomUUID(),
    invite_code: 'ABC12345',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockFamilyMember(overrides?: Partial<FamilyMember>): FamilyMember {
  return {
    id: crypto.randomUUID(),
    family_id: crypto.randomUUID(),
    user_id: crypto.randomUUID(),
    nickname: '엄마',
    relationship: Relationship.Parent,
    health_score: 85,
    status: HealthStatus.Good,
    joined_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockMedication(overrides?: Partial<Medication>): Medication {
  return {
    id: crypto.randomUUID(),
    family_id: crypto.randomUUID(),
    member_id: crypto.randomUUID(),
    name: '혈압약',
    dosage: '10mg',
    frequency: '하루 1회',
    schedule_times: ['09:00'],
    start_date: '2025-01-01',
    end_date: null,
    notes: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockVital(overrides?: Partial<Vital>): Vital {
  return {
    id: crypto.randomUUID(),
    family_id: crypto.randomUUID(),
    member_id: crypto.randomUUID(),
    type: VitalType.BloodPressure,
    value: '122/80',
    unit: 'mmHg',
    measured_at: new Date().toISOString(),
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockTask(overrides?: Partial<Task>): Task {
  return {
    id: crypto.randomUUID(),
    family_id: crypto.randomUUID(),
    member_id: crypto.randomUUID(),
    title: '혈압약 복용',
    description: null,
    type: TaskType.Medication,
    reference_id: null,
    due_date: new Date().toISOString().split('T')[0],
    due_time: '09:00',
    completed: false,
    completed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}
