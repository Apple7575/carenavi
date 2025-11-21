import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Clock } from 'lucide-react';
import { useMedications } from '@/hooks/useMedications';

interface MedicationCardProps {
  medication: any;
  onEdit: () => void;
}

export function MedicationCard({ medication, onEdit }: MedicationCardProps) {
  const { deleteMedication, isDeleting } = useMedications();

  const handleDelete = () => {
    if (confirm('이 복약 정보를 삭제하시겠습니까?')) {
      deleteMedication(medication.id);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{medication.name}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">{medication.dosage}</p>
          </div>
          <Badge variant={medication.is_active ? 'default' : 'secondary'}>
            {medication.is_active ? '활성' : '비활성'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700">복용 대상</p>
          <p className="text-sm text-gray-600">
            {medication.family_member.user.full_name} (
            {medication.family_member.relationship})
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">복용 빈도</p>
          <p className="text-sm text-gray-600">{medication.frequency}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            복용 시간
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {medication.schedule_times.map((time: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {time}
              </Badge>
            ))}
          </div>
        </div>

        {medication.instructions && (
          <div>
            <p className="text-sm font-medium text-gray-700">복용 방법</p>
            <p className="text-sm text-gray-600">{medication.instructions}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            수정
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-error hover:text-error"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
