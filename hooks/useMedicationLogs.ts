'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface MedicationLog {
  id: string;
  user_id: string;
  medication_id: string;
  scheduled_time: string;
  scheduled_date: string;
  taken_at?: string;
  status: 'pending' | 'taken' | 'skipped';
  notes?: string;
  medication: {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    notes?: string;
  };
}

export function useMedicationLogs(date?: string) {
  const queryClient = useQueryClient();
  const today = date || new Date().toISOString().split('T')[0];

  const query = useQuery({
    queryKey: ['medication-logs', today],
    queryFn: async () => {
      const response = await fetch(`/api/medication-logs?date=${today}`);
      if (!response.ok) throw new Error('Failed to fetch medication logs');
      return response.json() as Promise<MedicationLog[]>;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ logId, status, takenAt }: { logId: string; status: string; takenAt?: string }) => {
      const response = await fetch('/api/medication-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          log_id: logId,
          status,
          taken_at: takenAt || new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to update medication log');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medication-logs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    ...query,
    updateLog: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
