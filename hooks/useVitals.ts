'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Vital {
  id: string;
  family_member_id: string;
  type: 'blood_pressure' | 'blood_sugar' | 'weight' | 'heart_rate';
  value: string;
  measured_at: string;
  notes?: string;
  family_member: {
    id: string;
    relationship: string;
    user: {
      full_name: string;
    };
  };
}

export function useVitals(familyMemberId?: string, type?: string, days: number = 30) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['vitals', familyMemberId, type, days],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (familyMemberId) params.append('family_member_id', familyMemberId);
      if (type) params.append('type', type);
      params.append('days', days.toString());

      const response = await fetch(`/api/vitals?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch vitals');
      return response.json() as Promise<Vital[]>;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Vital>) => {
      const response = await fetch('/api/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create vital');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vitals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/vitals/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete vital');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vitals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    ...query,
    createVital: createMutation.mutate,
    deleteVital: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
