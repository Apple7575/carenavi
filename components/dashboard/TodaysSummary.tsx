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
    <div className="grid gap-4 md:grid-cols-3">
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
  );
}
