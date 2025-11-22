'use client';

import * as React from 'react';
import { Plus, Pill as PillIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMedications } from '@/hooks/useMedications';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { MedicationCard } from '@/components/medications/MedicationCard';
import { MedicationDialog } from '@/components/medications/MedicationDialog';
import { TodaySchedule } from '@/components/medications/TodaySchedule';

export default function MedicationsPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedMedication, setSelectedMedication] = React.useState<any>(null);
  const { data: medications, isLoading, error } = useMedications();

  const handleEdit = (medication: any) => {
    setSelectedMedication(medication);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedMedication(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="복약 정보를 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="p-6">
          <EmptyState
            icon={PillIcon}
            title="데이터를 불러올 수 없습니다"
            description="잠시 후 다시 시도해 주세요"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">복약 관리</h1>
          <p className="text-gray-500 mt-1">나의 복약 일정을 관리하세요</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          복약 추가
        </Button>
      </div>

      {/* Today's Schedule */}
      <TodaySchedule />

      {/* Medications List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">등록된 복약</h2>
        {!medications || medications.length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <EmptyState
                icon={PillIcon}
                title="등록된 복약이 없습니다"
                description="복약을 추가하여 일정을 관리하세요"
                actionLabel="복약 추가하기"
                onAction={() => setIsDialogOpen(true)}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {medications.map((medication: any) => (
              <MedicationCard
                key={medication.id}
                medication={medication}
                onEdit={() => handleEdit(medication)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <MedicationDialog
        open={isDialogOpen}
        onOpenChange={handleClose}
        medication={selectedMedication}
      />
    </div>
  );
}
