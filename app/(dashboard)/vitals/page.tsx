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

const sampleVitals = [
  // Blood Pressure - 7 days
  {
    id: 'sample-bp-1',
    type: 'blood_pressure',
    value: '120/80',
    unit: 'mmHg',
    measured_at: new Date().toISOString(),
    notes: '정상 범위',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bp-2',
    type: 'blood_pressure',
    value: '118/78',
    unit: 'mmHg',
    measured_at: new Date(Date.now() - 86400000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bp-3',
    type: 'blood_pressure',
    value: '122/82',
    unit: 'mmHg',
    measured_at: new Date(Date.now() - 172800000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bp-4',
    type: 'blood_pressure',
    value: '119/79',
    unit: 'mmHg',
    measured_at: new Date(Date.now() - 259200000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bp-5',
    type: 'blood_pressure',
    value: '121/81',
    unit: 'mmHg',
    measured_at: new Date(Date.now() - 345600000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bp-6',
    type: 'blood_pressure',
    value: '117/77',
    unit: 'mmHg',
    measured_at: new Date(Date.now() - 432000000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bp-7',
    type: 'blood_pressure',
    value: '120/80',
    unit: 'mmHg',
    measured_at: new Date(Date.now() - 518400000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },

  // Blood Sugar - 7 days
  {
    id: 'sample-bs-1',
    type: 'blood_sugar',
    value: '95',
    unit: 'mg/dL',
    measured_at: new Date().toISOString(),
    notes: '공복 혈당',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bs-2',
    type: 'blood_sugar',
    value: '92',
    unit: 'mg/dL',
    measured_at: new Date(Date.now() - 86400000).toISOString(),
    notes: '공복 혈당',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bs-3',
    type: 'blood_sugar',
    value: '98',
    unit: 'mg/dL',
    measured_at: new Date(Date.now() - 172800000).toISOString(),
    notes: '공복 혈당',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bs-4',
    type: 'blood_sugar',
    value: '94',
    unit: 'mg/dL',
    measured_at: new Date(Date.now() - 259200000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bs-5',
    type: 'blood_sugar',
    value: '96',
    unit: 'mg/dL',
    measured_at: new Date(Date.now() - 345600000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bs-6',
    type: 'blood_sugar',
    value: '91',
    unit: 'mg/dL',
    measured_at: new Date(Date.now() - 432000000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-bs-7',
    type: 'blood_sugar',
    value: '97',
    unit: 'mg/dL',
    measured_at: new Date(Date.now() - 518400000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },

  // Weight - 7 days
  {
    id: 'sample-wt-1',
    type: 'weight',
    value: '70.5',
    unit: 'kg',
    measured_at: new Date().toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-wt-2',
    type: 'weight',
    value: '70.3',
    unit: 'kg',
    measured_at: new Date(Date.now() - 86400000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-wt-3',
    type: 'weight',
    value: '70.7',
    unit: 'kg',
    measured_at: new Date(Date.now() - 172800000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-wt-4',
    type: 'weight',
    value: '70.4',
    unit: 'kg',
    measured_at: new Date(Date.now() - 259200000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-wt-5',
    type: 'weight',
    value: '70.6',
    unit: 'kg',
    measured_at: new Date(Date.now() - 345600000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-wt-6',
    type: 'weight',
    value: '70.2',
    unit: 'kg',
    measured_at: new Date(Date.now() - 432000000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-wt-7',
    type: 'weight',
    value: '70.8',
    unit: 'kg',
    measured_at: new Date(Date.now() - 518400000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },

  // Heart Rate - 7 days
  {
    id: 'sample-hr-1',
    type: 'heart_rate',
    value: '72',
    unit: 'bpm',
    measured_at: new Date().toISOString(),
    notes: '안정시',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-hr-2',
    type: 'heart_rate',
    value: '70',
    unit: 'bpm',
    measured_at: new Date(Date.now() - 86400000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-hr-3',
    type: 'heart_rate',
    value: '74',
    unit: 'bpm',
    measured_at: new Date(Date.now() - 172800000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-hr-4',
    type: 'heart_rate',
    value: '71',
    unit: 'bpm',
    measured_at: new Date(Date.now() - 259200000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-hr-5',
    type: 'heart_rate',
    value: '73',
    unit: 'bpm',
    measured_at: new Date(Date.now() - 345600000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-hr-6',
    type: 'heart_rate',
    value: '69',
    unit: 'bpm',
    measured_at: new Date(Date.now() - 432000000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
  {
    id: 'sample-hr-7',
    type: 'heart_rate',
    value: '72',
    unit: 'bpm',
    measured_at: new Date(Date.now() - 518400000).toISOString(),
    notes: '',
    family_member: { nickname: '샘플 사용자' },
  },
];

export default function VitalsPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const { data: vitals, isLoading, error } = useVitals(undefined, selectedType === 'all' ? undefined : selectedType);

  // Use sample data if no vitals exist
  let displayVitals = (!vitals || vitals.length === 0) ? sampleVitals : vitals;

  // Filter sample data by type if needed
  if ((!vitals || vitals.length === 0) && selectedType !== 'all') {
    displayVitals = sampleVitals.filter(v => v.type === selectedType);
  }

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
          {/* Chart */}
          <VitalsChart vitals={displayVitals} />

          {/* List */}
          <VitalsList vitals={displayVitals} />
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}
      <VitalDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
