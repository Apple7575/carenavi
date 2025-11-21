import { useQueryClient } from '@tanstack/react-query';

export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidateDashboard: () => queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
    invalidateMedications: () => queryClient.invalidateQueries({ queryKey: ['medications'] }),
    invalidateVitals: () => queryClient.invalidateQueries({ queryKey: ['vitals'] }),
    invalidateFamily: () => queryClient.invalidateQueries({ queryKey: ['family'] }),
    invalidateTasks: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    invalidateReports: () => queryClient.invalidateQueries({ queryKey: ['reports'] }),
  };
}

export function useOptimisticUpdate<T>(queryKey: unknown[]) {
  const queryClient = useQueryClient();

  return {
    onMutate: async (newData: T) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous value
      const previousData = queryClient.getQueryData<T>(queryKey);

      // Optimistically update
      queryClient.setQueryData<T>(queryKey, newData);

      return { previousData };
    },
    onError: (_err: unknown, _newData: T, context: { previousData?: T } | undefined) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData<T>(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey });
    },
  };
}
