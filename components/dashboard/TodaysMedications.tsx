'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Pill } from 'lucide-react';
import { formatTime } from '@/lib/utils/date';
import { EmptyState } from '@/components/shared/EmptyState';
import { cn } from '@/lib/utils/cn';

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

interface TodaysMedicationsProps {
  medications: MedicationLog[];
  onToggle?: (logId: string, taken: boolean) => void;
}

export function TodaysMedications({ medications, onToggle }: TodaysMedicationsProps) {
  const handleCheckedChange = (logId: string, checked: boolean) => {
    if (onToggle) {
      onToggle(logId, checked);
    }
  };

  if (medications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>오늘의 복약</CardTitle>
          <CardDescription>오늘 예정된 복약 일정</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Pill}
            title="오늘 예정된 복약이 없습니다"
            description="복약 일정을 등록하여 관리를 시작하세요"
            actionLabel="복약 등록하기"
          />
        </CardContent>
      </Card>
    );
  }

  const pendingCount = medications.filter(m => m.status === 'pending').length;
  const takenCount = medications.filter(m => m.status === 'taken').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘의 복약</CardTitle>
        <CardDescription>
          {takenCount}/{medications.length}개 완료
          {pendingCount > 0 && (
            <span className="ml-2 text-warning">
              ({pendingCount}개 대기중)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {medications.map((log) => {
            const isTaken = log.status === 'taken';
            const isPending = log.status === 'pending';

            return (
              <div
                key={log.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg shadow-sm hover:shadow-md transition-all',
                  isTaken && 'bg-gray-50',
                  isPending && 'bg-primary-50'
                )}
              >
                <Checkbox
                  id={log.id}
                  checked={isTaken}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(log.id, checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <label
                        htmlFor={log.id}
                        className={cn(
                          'text-sm font-medium cursor-pointer',
                          isTaken && 'line-through text-gray-500'
                        )}
                      >
                        {log.medication.name}
                      </label>
                      <p className="text-xs text-gray-500">
                        {log.medication.dosage}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatTime(log.scheduled_at)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {log.medication.family_member.user.full_name} (
                    {log.medication.family_member.relationship})
                  </p>
                  {log.taken_at && (
                    <p className="text-xs text-success">
                      ✓ {formatTime(log.taken_at)} 복용 완료
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
