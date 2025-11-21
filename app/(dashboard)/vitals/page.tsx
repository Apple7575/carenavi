'use client';

import * as React from 'react';
import { Plus, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useVitals } from '@/hooks/useVitals';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { VitalsList } from '@/components/vitals/VitalsList';
import { VitalsChart } from '@/components/vitals/VitalsChart';
import { VitalDialog } from '@/components/vitals/VitalDialog';

export default function VitalsPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const { data: vitals, isLoading, error } = useVitals(undefined, selectedType === 'all' ? undefined : selectedType);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="건강 지표를 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-8 p-6">
        <EmptyState
          icon={Activity}
          title="데이터를 불러올 수 없습니다"
          description="잠시 후 다시 시도해 주세요"
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">건강 지표</h1>
          <p className="text-gray-500 mt-1">가족 구성원의 건강 지표를 기록하고 추적하세요</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          지표 추가
        </Button>
      </div>

      {/* Type Filter Tabs */}
      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="blood_pressure">혈압</TabsTrigger>
          <TabsTrigger value="blood_sugar">혈당</TabsTrigger>
          <TabsTrigger value="weight">체중</TabsTrigger>
          <TabsTrigger value="heart_rate">심박수</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType} className="space-y-6">
          {!vitals || vitals.length === 0 ? (
            <Card className="p-12">
              <EmptyState
                icon={Activity}
                title="기록된 건강 지표가 없습니다"
                description="건강 지표를 추가하여 건강 상태를 추적하세요"
                actionLabel="지표 추가하기"
                onAction={() => setIsDialogOpen(true)}
              />
            </Card>
          ) : (
            <>
              {/* Chart */}
              <VitalsChart vitals={vitals} />

              {/* List */}
              <VitalsList vitals={vitals} />
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}
      <VitalDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
