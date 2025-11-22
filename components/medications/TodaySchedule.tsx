'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2 } from 'lucide-react';
import { useMedicationLogs } from '@/hooks/useMedicationLogs';
import { useMedications } from '@/hooks/useMedications';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { cn } from '@/lib/utils/cn';

interface ScheduleItem {
  medication_id: string;
  medication_name: string;
  dosage: string;
  time: string;
  log?: {
    id: string;
    status: 'pending' | 'taken' | 'skipped';
    taken_at?: string;
  };
}

export function TodaySchedule() {
  const { data: medications, isLoading: medsLoading } = useMedications();
  const { data: logs, isLoading: logsLoading, updateLog, isUpdating } = useMedicationLogs();

  const schedule = React.useMemo(() => {
    if (!medications) return [];

    const items: ScheduleItem[] = [];
    const today = new Date().toISOString().split('T')[0];

    medications.forEach((med) => {
      if (med.schedule_times && med.schedule_times.length > 0) {
        med.schedule_times.forEach((time) => {
          const log = logs?.find(
            (l) => l.medication_id === med.id && l.scheduled_time === time + ':00'
          );

          items.push({
            medication_id: med.id,
            medication_name: med.name,
            dosage: med.dosage,
            time,
            log: log ? {
              id: log.id,
              status: log.status,
              taken_at: log.taken_at,
            } : undefined,
          });
        });
      }
    });

    return items.sort((a, b) => a.time.localeCompare(b.time));
  }, [medications, logs]);

  const handleToggle = (item: ScheduleItem) => {
    if (!item.log) return;

    const newStatus = item.log.status === 'taken' ? 'pending' : 'taken';
    updateLog({
      logId: item.log.id,
      status: newStatus,
      takenAt: newStatus === 'taken' ? new Date().toISOString() : undefined,
    });
  };

  if (medsLoading || logsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>오늘의 복약 스케줄</CardTitle>
          <CardDescription>오늘 복용해야 할 약</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (schedule.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>오늘의 복약 스케줄</CardTitle>
          <CardDescription>오늘 복용해야 할 약</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 text-center py-8">
            등록된 복약 스케줄이 없습니다
          </p>
        </CardContent>
      </Card>
    );
  }

  const takenCount = schedule.filter((item) => item.log?.status === 'taken').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>오늘의 복약 스케줄</CardTitle>
        <CardDescription>
          {takenCount}/{schedule.length}개 복용 완료
          {takenCount === schedule.length && schedule.length > 0 && (
            <span className="ml-2 text-success">
              <CheckCircle2 className="inline h-4 w-4 ml-1" />
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {schedule.map((item, index) => {
            const isTaken = item.log?.status === 'taken';
            const isPending = item.log?.status === 'pending';

            return (
              <div
                key={`${item.medication_id}-${item.time}-${index}`}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg transition-all',
                  isTaken && 'bg-gray-50',
                  isPending && 'bg-blue-50 shadow-sm',
                  !item.log && 'bg-yellow-50'
                )}
              >
                {item.log && (
                  <Checkbox
                    id={`${item.medication_id}-${item.time}`}
                    checked={isTaken}
                    onCheckedChange={() => handleToggle(item)}
                    disabled={isUpdating}
                    className="mt-1"
                  />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <label
                        htmlFor={`${item.medication_id}-${item.time}`}
                        className={cn(
                          'text-sm font-medium cursor-pointer',
                          isTaken && 'line-through text-gray-500'
                        )}
                      >
                        {item.medication_name}
                      </label>
                      <p className="text-xs text-gray-500">{item.dosage}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.time}
                      </Badge>
                      {!item.log && (
                        <Badge variant="secondary" className="text-xs">
                          로그 없음
                        </Badge>
                      )}
                    </div>
                  </div>
                  {isTaken && item.log?.taken_at && (
                    <p className="text-xs text-success">
                      ✓ {new Date(item.log.taken_at).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} 복용 완료
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
