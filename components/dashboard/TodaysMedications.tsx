'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Pill } from 'lucide-react';
import { formatTime } from '@/lib/utils/date';
import { EmptyState } from '@/components/shared/EmptyState';
import { cn } from '@/lib/utils/cn';

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

interface TodaysMedicationsProps {
  medications: Medication[];
}

export function TodaysMedications({ medications }: TodaysMedicationsProps) {
  if (medications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>나의 복약</CardTitle>
          <CardDescription>활성 복약 목록</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Pill}
            title="등록된 복약이 없습니다"
            description="복약 일정을 등록하여 관리를 시작하세요"
            actionLabel="복약 등록하기"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>나의 복약</CardTitle>
        <CardDescription>
          총 {medications.length}개의 활성 복약
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {medications.map((medication) => (
            <div
              key={medication.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{medication.name}</p>
                    <p className="text-xs text-gray-500">{medication.dosage}</p>
                  </div>
                  <span className="text-xs text-primary font-medium whitespace-nowrap">
                    {medication.frequency}
                  </span>
                </div>
                {medication.schedule_times && medication.schedule_times.length > 0 && (
                  <p className="text-xs text-gray-600">
                    복용 시간: {medication.schedule_times.join(', ')}
                  </p>
                )}
                {medication.notes && (
                  <p className="text-xs text-gray-500">{medication.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
