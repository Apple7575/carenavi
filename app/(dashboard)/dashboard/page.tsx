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
          <TodaysMedications medications={data.todaysMedications} />
          <QuickActions />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <FamilyOverview members={data.familyMembers} />
          <VitalsChart vitals={data.recentVitals} />
        </div>
      </div>
    </div>
  );
}
