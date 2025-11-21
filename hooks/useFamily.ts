'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  relationship: string;
  health_score: number;
  status: 'good' | 'fair' | 'needs_review';
  family: {
    id: string;
    name: string;
    invite_code: string;
  };
  user: {
    full_name: string;
    email: string;
  };
}

export function useFamily() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['family'],
    queryFn: async () => {
      const response = await fetch('/api/family');
      if (!response.ok) throw new Error('Failed to fetch family');
      return response.json() as Promise<FamilyMember[]>;
    },
  });

  const createFamilyMutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      const response = await fetch('/api/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create family');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family'] });
    },
  });

  const joinFamilyMutation = useMutation({
    mutationFn: async (data: { invite_code: string; relationship: string }) => {
      const response = await fetch('/api/family/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to join family');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family'] });
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/family/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove member');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family'] });
    },
  });

  return {
    ...query,
    familyMembers: query.data,
    createFamily: createFamilyMutation.mutate,
    joinFamily: joinFamilyMutation.mutate,
    removeMember: removeMemberMutation.mutate,
    isCreating: createFamilyMutation.isPending,
    isJoining: joinFamilyMutation.isPending,
    isRemoving: removeMemberMutation.isPending,
    joinError: joinFamilyMutation.error,
  };
}
