'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Pill, Calendar, Clock } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface FamilyMemberDetailDialogProps {
  member: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FamilyMemberDetailDialog({ member, open, onOpenChange }: FamilyMemberDetailDialogProps) {
  const [vitals, setVitals] = React.useState<any[]>([]);
  const [medications, setMedications] = React.useState<any[]>([]);
  const [isLoadingVitals, setIsLoadingVitals] = React.useState(false);
  const [isLoadingMeds, setIsLoadingMeds] = React.useState(false);

  React.useEffect(() => {
    if (open && member) {
      fetchVitals();
      fetchMedications();
    }
  }, [open, member]);

  const fetchVitals = async () => {
    setIsLoadingVitals(true);
    try {
      const response = await fetch(`/api/family/${member.id}/vitals`);
      if (response.ok) {
        const data = await response.json();
        setVitals(data);
      }
    } catch (error) {
      console.error('Failed to fetch vitals:', error);
    } finally {
      setIsLoadingVitals(false);
    }
  };

  const fetchMedications = async () => {
    setIsLoadingMeds(true);
    try {
      const response = await fetch(`/api/family/${member.id}/medications`);
      if (response.ok) {
        const data = await response.json();
        setMedications(data);
      }
    } catch (error) {
      console.error('Failed to fetch medications:', error);
    } finally {
      setIsLoadingMeds(false);
    }
  };

  const getVitalTypeLabel = (type: string) => {
    switch (type) {
      case 'blood_pressure': return '혈압';
      case 'blood_sugar': return '혈당';
      case 'weight': return '체중';
      case 'heart_rate': return '심박수';
      default: return type;
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return '매일';
      case 'twice_daily': return '하루 2회';
      case 'three_times_daily': return '하루 3회';
      case 'weekly': return '주 1회';
      case 'as_needed': return '필요시';
      default: return frequency;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {member.user.full_name}님의 건강 정보
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="vitals" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vitals">
              <Activity className="h-4 w-4 mr-2" />
              건강 지표
            </TabsTrigger>
            <TabsTrigger value="medications">
              <Pill className="h-4 w-4 mr-2" />
              복약 관리
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vitals" className="space-y-4 mt-4">
            {isLoadingVitals ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" text="건강 지표를 불러오는 중..." />
              </div>
            ) : vitals.length === 0 ? (
              <Card className="p-8">
                <EmptyState
                  icon={Activity}
                  title="기록된 건강 지표가 없습니다"
                  description="아직 등록된 건강 지표가 없습니다"
                />
              </Card>
            ) : (
              <div className="space-y-3">
                {vitals.map((vital) => (
                  <Card key={vital.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{getVitalTypeLabel(vital.type)}</Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(vital.measured_at), 'PPp', { locale: ko })}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">{vital.value}</span>
                            <span className="text-sm text-gray-500">{vital.unit}</span>
                          </div>
                          {vital.notes && (
                            <p className="text-sm text-gray-600 mt-2">{vital.notes}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="medications" className="space-y-4 mt-4">
            {isLoadingMeds ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" text="복약 정보를 불러오는 중..." />
              </div>
            ) : medications.length === 0 ? (
              <Card className="p-8">
                <EmptyState
                  icon={Pill}
                  title="등록된 약이 없습니다"
                  description="아직 복약 정보가 등록되지 않았습니다"
                />
              </Card>
            ) : (
              <div className="space-y-3">
                {medications.map((medication) => (
                  <Card key={medication.id} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{medication.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{getFrequencyLabel(medication.frequency)}</Badge>
                            {medication.is_active && (
                              <Badge className="bg-success text-white">복용중</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Pill className="h-4 w-4" />
                          <span>{medication.dosage}</span>
                        </div>
                        {medication.schedule_times && medication.schedule_times.length > 0 && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{medication.schedule_times.join(', ')}</span>
                          </div>
                        )}
                        {medication.start_date && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {format(new Date(medication.start_date), 'PPP', { locale: ko })}
                              {medication.end_date && ` ~ ${format(new Date(medication.end_date), 'PPP', { locale: ko })}`}
                            </span>
                          </div>
                        )}
                        {medication.notes && (
                          <p className="text-gray-600 pt-2 border-t">{medication.notes}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
