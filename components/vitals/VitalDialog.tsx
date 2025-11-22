'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVitals } from '@/hooks/useVitals';

interface VitalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VitalDialog({ open, onOpenChange }: VitalDialogProps) {
  const { createVital, isCreating } = useVitals();
  const [formData, setFormData] = React.useState({
    type: 'blood_pressure' as const,
    value: '',
    systolic: '',
    diastolic: '',
    measured_at: new Date().toISOString().slice(0, 16),
    notes: '',
    family_member_id: '',
  });

  React.useEffect(() => {
    if (open) {
      setFormData({
        type: 'blood_pressure',
        value: '',
        systolic: '',
        diastolic: '',
        measured_at: new Date().toISOString().slice(0, 16),
        notes: '',
        family_member_id: '',
      });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let value = formData.value;
    if (formData.type === 'blood_pressure' && formData.systolic && formData.diastolic) {
      value = `${formData.systolic}/${formData.diastolic}`;
    }

    createVital({
      type: formData.type,
      value,
      measured_at: formData.measured_at,
      notes: formData.notes,
      family_member_id: formData.family_member_id || undefined,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>건강 지표 추가</DialogTitle>
          <DialogDescription>건강 지표를 기록하세요</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">지표 유형 *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: any) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                <SelectItem value="blood_pressure">혈압</SelectItem>
                <SelectItem value="blood_sugar">혈당</SelectItem>
                <SelectItem value="weight">체중</SelectItem>
                <SelectItem value="heart_rate">심박수</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'blood_pressure' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systolic">수축기 *</Label>
                <Input
                  id="systolic"
                  type="number"
                  placeholder="120"
                  value={formData.systolic}
                  onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolic">이완기 *</Label>
                <Input
                  id="diastolic"
                  type="number"
                  placeholder="80"
                  value={formData.diastolic}
                  onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="value">
                측정값 * {formData.type === 'blood_sugar' && '(mg/dL)'}
                {formData.type === 'weight' && '(kg)'}
                {formData.type === 'heart_rate' && '(bpm)'}
              </Label>
              <Input
                id="value"
                type="number"
                step={formData.type === 'weight' ? '0.1' : '1'}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="measured_at">측정 시간 *</Label>
            <Input
              id="measured_at"
              type="datetime-local"
              value={formData.measured_at}
              onChange={(e) => setFormData({ ...formData, measured_at: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">메모</Label>
            <Input
              id="notes"
              placeholder="특이사항이 있다면 기록하세요"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={isCreating}>
              추가
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
