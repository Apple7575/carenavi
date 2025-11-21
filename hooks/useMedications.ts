'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Medication {
  id: string;
  family_member_id: string;
  name: string;
  dosage: string;
  frequency: string;
  schedule_times: string[];
  start_date: string;
  end_date?: string;
  instructions?: string;
  is_active: boolean;
  family_member: {
    id: string;
    relationship: string;
    user: {
      full_name: string;
    };
  };
}

export function useMedications(familyMemberId?: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['medications', familyMemberId],
    queryFn: async () => {
      const url = familyMemberId
        ? `/api/medications?family_member_id=${familyMemberId}`
        : '/api/medications';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch medications');
      return response.json() as Promise<Medication[]>;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Medication>) => {
      const response = await fetch('/api/medications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create medication');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Medication> & { id: string }) => {
      const response = await fetch(`/api/medications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update medication');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/medications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete medication');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const logMutation = useMutation({
    mutationFn: async (data: { log_id: string; status: string; taken_at?: string; notes?: string }) => {
      const response = await fetch('/api/medication-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update medication log');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    ...query,
    createMedication: createMutation.mutate,
    updateMedication: updateMutation.mutate,
    deleteMedication: deleteMutation.mutate,
    logMedication: logMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isLogging: logMutation.isPending,
  };
}
