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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">평균 건강 점수</CardTitle>
          <Activity className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getScoreColor(avgHealthScore)}`}>
            {avgHealthScore}점
          </div>
          <p className="text-xs text-gray-500 mt-1">
            가족 전체 평균
          </p>
        </CardContent>
      </Card>

      {/* Medication Adherence */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">복약 순응도</CardTitle>
          <Pill className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getScoreColor(medicationAdherence)}`}>
            {medicationAdherence}%
          </div>
          <p className="text-xs text-gray-500 mt-1">
            오늘 복약 완료율
          </p>
        </CardContent>
      </Card>

      {/* Vitals Tracked */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">건강 지표</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{vitalsCount}개</div>
          <p className="text-xs text-gray-500 mt-1">
            최근 7일 기록
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
