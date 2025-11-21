'use client';

import { useQuery } from '@tanstack/react-query';

interface MedicationLog {
  id: string;
  medication_id: string;
  scheduled_at: string;
  taken_at?: string;
  status: 'pending' | 'taken' | 'skipped';
  notes?: string;
  medication: {
    name: string;
    dosage: string;
    family_member: {
      health_score: number;
      relationship: string;
      user: {
        full_name: string;
      };
    };
  };
}

interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  relationship: string;
  health_score: number;
  status: 'good' | 'fair' | 'needs_review';
  user: {
    full_name: string;
    email: string;
  };
}

interface Vital {
  id: string;
  family_member_id: string;
  type: 'blood_pressure' | 'blood_sugar' | 'weight' | 'heart_rate';
  value: string;
  measured_at: string;
  notes?: string;
  family_member: {
    user: {
      full_name: string;
    };
  };
}

interface HealthSummary {
  avgHealthScore: number;
  medicationAdherence: number;
  vitalsCount: number;
}

interface DashboardData {
  todaysMedications: MedicationLog[];
  familyMembers: FamilyMember[];
  recentVitals: Vital[];
  healthSummary: HealthSummary;
}

async function fetchDashboardData(): Promise<DashboardData> {
  const response = await fetch('/api/dashboard');

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return response.json();
}

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}
