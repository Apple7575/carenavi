'use client';

import { useQuery } from '@tanstack/react-query';

interface Medication {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  frequency: string;
  schedule_times: string[];
  start_date?: string;
  end_date?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
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
  user_id: string;
  type: 'blood_pressure' | 'blood_sugar' | 'weight' | 'heart_rate';
  value: string;
  unit: string;
  measured_at: string;
  notes?: string;
}

interface HealthSummary {
  avgHealthScore: number;
  medicationAdherence: number;
  vitalsCount: number;
}

interface DashboardData {
  todaysMedications: Medication[];
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
