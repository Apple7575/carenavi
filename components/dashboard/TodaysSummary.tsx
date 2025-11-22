import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Pill, TrendingUp } from 'lucide-react';

interface TodaysSummaryProps {
  healthSummary: {
    avgHealthScore: number;
    medicationAdherence: number;
    vitalsCount: number;
  };
}

export function TodaysSummary({ healthSummary }: TodaysSummaryProps) {
  const { avgHealthScore, medicationAdherence, vitalsCount } = healthSummary;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <>
      {/* Mobile: Single Combined Card */}
      <Card className="md:hidden border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">오늘의 요약</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Average Health Score */}
          <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">평균 건강 점수</p>
                <p className="text-xs text-gray-500">가족 전체 평균</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(avgHealthScore)}`}>
              {avgHealthScore}점
            </div>
          </div>

          {/* Medication Adherence */}
          <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Pill className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">복약 순응도</p>
                <p className="text-xs text-gray-500">오늘 복약 완료율</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(medicationAdherence)}`}>
              {medicationAdherence}%
            </div>
          </div>

          {/* Vitals Tracked */}
          <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">건강 지표</p>
                <p className="text-xs text-gray-500">최근 7일 기록</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{vitalsCount}개</div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop: Three Separate Cards */}
      <div className="hidden md:grid gap-4 md:grid-cols-3">
        {/* Average Health Score */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">평균 건강 점수</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(avgHealthScore)}`}>
              {avgHealthScore}점
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              가족 전체 평균
            </p>
          </CardContent>
        </Card>

        {/* Medication Adherence */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">복약 순응도</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Pill className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(medicationAdherence)}`}>
              {medicationAdherence}%
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              오늘 복약 완료율
            </p>
          </CardContent>
        </Card>

        {/* Vitals Tracked */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">건강 지표</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{vitalsCount}개</div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              최근 7일 기록
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
