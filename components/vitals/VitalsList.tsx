import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { useVitals } from '@/hooks/useVitals';
import { formatDateTime } from '@/lib/utils/date';

interface VitalsListProps {
  vitals: any[];
}

const typeLabels: Record<string, string> = {
  blood_pressure: '혈압',
  blood_sugar: '혈당',
  weight: '체중',
  heart_rate: '심박수',
};

export function VitalsList({ vitals }: VitalsListProps) {
  const { deleteVital, isDeleting } = useVitals();

  const handleDelete = (id: string) => {
    if (confirm('이 건강 지표를 삭제하시겠습니까?')) {
      deleteVital(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>기록 내역</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {vitals.map((vital: any) => (
            <div
              key={vital.id}
              className="flex items-center justify-between p-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{typeLabels[vital.type]}</Badge>
                  <span className="text-sm font-medium">{vital.value}</span>
                  {vital.type === 'blood_pressure' && (
                    <span className="text-xs text-gray-500">mmHg</span>
                  )}
                  {vital.type === 'blood_sugar' && (
                    <span className="text-xs text-gray-500">mg/dL</span>
                  )}
                  {vital.type === 'weight' && (
                    <span className="text-xs text-gray-500">kg</span>
                  )}
                  {vital.type === 'heart_rate' && (
                    <span className="text-xs text-gray-500">bpm</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {vital.family_member?.nickname || '사용자'} • {formatDateTime(vital.measured_at)}
                </p>
                {vital.notes && (
                  <p className="text-sm text-gray-600 mt-1">{vital.notes}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(vital.id)}
                disabled={isDeleting}
                className="text-error hover:text-error"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
