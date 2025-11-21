/**
 * CareNavi Application Constants
 * Centralized configuration and constant values
 */

// Design tokens (align with tailwind.config.js)
export const COLORS = {
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

// Health score thresholds
export const HEALTH_SCORE = {
  MIN: 0,
  MAX: 100,
  GOOD_THRESHOLD: 80,
  FAIR_THRESHOLD: 60,
} as const;

// Vital ranges (normal values)
export const VITAL_RANGES = {
  blood_pressure: {
    systolic: { min: 90, max: 140, unit: 'mmHg' },
    diastolic: { min: 60, max: 90, unit: 'mmHg' },
  },
  blood_sugar: {
    fasting: { min: 70, max: 126, unit: 'mg/dL' },
  },
  heart_rate: {
    resting: { min: 60, max: 100, unit: 'bpm' },
  },
  weight: {
    unit: 'kg',
  },
} as const;

// Medication adherence
export const ADHERENCE = {
  EXCELLENT: 90,
  GOOD: 80,
  FAIR: 70,
} as const;

// User roles
export const USER_ROLES = {
  CAREGIVER: 'caregiver',
  PATIENT: 'patient',
} as const;

// Relationship types
export const RELATIONSHIPS = {
  SELF: 'self',
  PARENT: 'parent',
  CHILD: 'child',
  SPOUSE: 'spouse',
  OTHER: 'other',
} as const;

// Health status
export const HEALTH_STATUS = {
  GOOD: 'good',
  FAIR: 'fair',
  NEEDS_REVIEW: 'needs_review',
} as const;

// Medication log status
export const MEDICATION_STATUS = {
  PENDING: 'pending',
  TAKEN: 'taken',
  SKIPPED: 'skipped',
} as const;

// Vital types
export const VITAL_TYPES = {
  BLOOD_PRESSURE: 'blood_pressure',
  BLOOD_SUGAR: 'blood_sugar',
  WEIGHT: 'weight',
  HEART_RATE: 'heart_rate',
} as const;

// Product categories
export const PRODUCT_CATEGORIES = {
  SUPPLEMENT: 'supplement',
  DEVICE: 'device',
  SERVICE: 'service',
} as const;

// Task types
export const TASK_TYPES = {
  MEDICATION: 'medication',
  VITAL: 'vital',
  APPOINTMENT: 'appointment',
  CUSTOM: 'custom',
} as const;

// API routes
export const API_ROUTES = {
  DASHBOARD: '/api/dashboard',
  USERS: '/api/users',
  FAMILIES: '/api/families',
  MEDICATIONS: '/api/medications',
  VITALS: '/api/vitals',
  REPORTS: '/api/reports',
  PRODUCTS: '/api/products',
  TASKS: '/api/tasks',
} as const;

// Query keys for React Query
export const QUERY_KEYS = {
  DASHBOARD: ['dashboard'],
  USER: ['user'],
  FAMILIES: ['families'],
  FAMILY_MEMBERS: ['family-members'],
  MEDICATIONS: ['medications'],
  MEDICATION_LOGS: ['medication-logs'],
  VITALS: ['vitals'],
  REPORTS: ['reports'],
  PRODUCTS: ['products'],
  TASKS: ['tasks'],
} as const;

// App URLs
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// External links
export const EXTERNAL_LINKS = {
  SUPPORT: 'https://carenavi.com/support',
  DOCS: 'https://carenavi.com/docs',
  PRIVACY: 'https://carenavi.com/privacy',
  TERMS: 'https://carenavi.com/terms',
} as const;
