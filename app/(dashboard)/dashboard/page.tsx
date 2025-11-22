'use client';

import * as React from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import { TodaysSummary } from '@/components/dashboard/TodaysSummary';
import { TodaysMedications } from '@/components/dashboard/TodaysMedications';
import { FamilyOverview } from '@/components/dashboard/FamilyOverview';
import { VitalsChart } from '@/components/dashboard/VitalsChart';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Sample data for when user has no data
const sampleMedications = [
  {
    id: 'sample-med-1',
    medication_id: 'sample-1',
    scheduled_at: new Date().toISOString(),
    status: 'pending' as const,
    medication: {
      name: '아스피린',
      dosage: '100mg',
      family_member: {
        health_score: 85,
        relationship: '본인',
        user: {
          full_name: '샘플 사용자',
        },
      },
    },
  },
  {
    id: 'sample-med-2',
    medication_id: 'sample-2',
    scheduled_at: new Date(Date.now() + 3600000).toISOString(),
    status: 'pending' as const,
    medication: {
      name: '혈압약',
      dosage: '5mg',
      family_member: {
        health_score: 85,
        relationship: '본인',
        user: {
          full_name: '샘플 사용자',
        },
      },
    },
  },
  {
    id: 'sample-med-3',
    medication_id: 'sample-3',
    scheduled_at: new Date(Date.now() - 3600000).toISOString(),
    taken_at: new Date(Date.now() - 3500000).toISOString(),
    status: 'taken' as const,
    medication: {
      name: '비타민 D',
      dosage: '1000IU',
      family_member: {
        health_score: 85,
        relationship: '본인',
        user: {
          full_name: '샘플 사용자',
        },
      },
    },
  },
];

const sampleVitals = [
  {
    id: 'sample-v-1',
    family_member_id: 'sample',
    type: 'blood_pressure' as const,
    value: '120/80',
    measured_at: new Date().toISOString(),
    family_member: { user: { full_name: '샘플 사용자' } },
  },
  {
    id: 'sample-v-2',
    family_member_id: 'sample',
    type: 'blood_pressure' as const,
    value: '118/78',
    measured_at: new Date(Date.now() - 86400000).toISOString(),
    family_member: { user: { full_name: '샘플 사용자' } },
  },
  {
    id: 'sample-v-3',
    family_member_id: 'sample',
    type: 'blood_pressure' as const,
    value: '122/82',
    measured_at: new Date(Date.now() - 172800000).toISOString(),
    family_member: { user: { full_name: '샘플 사용자' } },
  },
  {
    id: 'sample-v-4',
    family_member_id: 'sample',
    type: 'blood_sugar' as const,
    value: '95',
    measured_at: new Date().toISOString(),
    family_member: { user: { full_name: '샘플 사용자' } },
  },
  {
    id: 'sample-v-5',
    family_member_id: 'sample',
    type: 'blood_sugar' as const,
    value: '92',
    measured_at: new Date(Date.now() - 86400000).toISOString(),
    family_member: { user: { full_name: '샘플 사용자' } },
  },
  {
    id: 'sample-v-6',
    family_member_id: 'sample',
    type: 'heart_rate' as const,
    value: '72',
    measured_at: new Date().toISOString(),
    family_member: { user: { full_name: '샘플 사용자' } },
  },
  {
    id: 'sample-v-7',
    family_member_id: 'sample',
    type: 'heart_rate' as const,
    value: '70',
    measured_at: new Date(Date.now() - 86400000).toISOString(),
    family_member: { user: { full_name: '샘플 사용자' } },
  },
];

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="대시보드를 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="flex items-center gap-3 p-6">
          <AlertCircle className="h-5 w-5 text-error" />
          <div>
            <p className="font-medium text-gray-900">데이터를 불러올 수 없습니다</p>
            <p className="text-sm text-gray-500 mt-1">
              잠시 후 다시 시도해 주세요
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  // Use sample data if user has no data
  const displayMedications = (!data.todaysMedications || data.todaysMedications.length === 0)
    ? sampleMedications
    : data.todaysMedications;

  const displayVitals = (!data.recentVitals || data.recentVitals.length === 0)
    ? sampleVitals
    : data.recentVitals;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-500 mt-1">가족의 건강 상태를 한눈에 확인하세요</p>
      </div>

      {/* Today's Summary - 3 stat cards */}
      <TodaysSummary healthSummary={data.healthSummary} />

      {/* Main Content - 2 column layout on desktop */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <TodaysMedications medications={displayMedications} />
          <QuickActions />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <FamilyOverview members={data.familyMembers} />
          <VitalsChart vitals={displayVitals} />
        </div>
      </div>
    </div>
  );
}
