'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMedications } from '@/hooks/useMedications';

interface MedicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medication?: any;
}

export function MedicationDialog({ open, onOpenChange, medication }: MedicationDialogProps) {
  const { createMedication, updateMedication, isCreating, isUpdating } = useMedications();

  const [formData, setFormData] = React.useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    schedule_times: ['09:00'],
    start_date: '',
    end_date: '',
    instructions: '',
    is_active: true,
  });

  React.useEffect(() => {
    if (medication) {
      setFormData({
        name: medication.name || '',
        dosage: medication.dosage || '',
        frequency: medication.frequency || 'daily',
        schedule_times: medication.schedule_times || ['09:00'],
        start_date: medication.start_date || '',
        end_date: medication.end_date || '',
        instructions: medication.instructions || '',
        is_active: medication.is_active ?? true,
      });
    } else {
      setFormData({
        name: '',
        dosage: '',
        frequency: 'daily',
        schedule_times: ['09:00'],
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        instructions: '',
        is_active: true,
      });
    }
  }, [medication, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (medication) {
      updateMedication({ id: medication.id, ...formData });
    } else {
      createMedication(formData);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-blue-600">
            {medication ? '복약 수정' : '복약 추가'}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            복약 정보를 정확하게 입력하세요
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">약물명 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage">용량 *</Label>
              <Input
                id="dosage"
                placeholder="예: 500mg, 1정"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">복용 빈도 *</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="daily">매일</SelectItem>
                  <SelectItem value="twice_daily">하루 2회</SelectItem>
                  <SelectItem value="three_times_daily">하루 3회</SelectItem>
                  <SelectItem value="weekly">주 1회</SelectItem>
                  <SelectItem value="as_needed">필요시</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule_time">복용 시간 *</Label>
              <Input
                id="schedule_time"
                type="time"
                value={formData.schedule_times[0]}
                onChange={(e) => setFormData({ ...formData, schedule_times: [e.target.value] })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date">시작일 *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">종료일</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-medium">복용 방법</Label>
            <Input
              id="instructions"
              placeholder="예: 식후 30분, 물과 함께"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <DialogFooter className="gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="hover:bg-gray-100"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {medication ? '수정' : '추가'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
