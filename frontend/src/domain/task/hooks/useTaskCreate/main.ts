import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';
import type { UseTaskCreateOptions, UseTaskCreateReturn } from './types';

/**
 * @hook useTaskCreate
 * @summary Hook for creating new tasks with optimistic updates and cache invalidation
 * @domain task
 * @type domain-hook
 * @category data
 *
 * @param {UseTaskCreateOptions} options - Hook configuration options
 * @returns {UseTaskCreateReturn} Task creation methods and state
 *
 * @examples
 * ```tsx
 * const { createTask, isCreating } = useTaskCreate({
 *   onSuccess: (data) => {
 *     console.log('Task created:', data);
 *     navigate('/tasks');
 *   },
 *   onError: (error) => {
 *     console.error('Failed to create task:', error);
 *   }
 * });
 * ```
 */
export const useTaskCreate = (options: UseTaskCreateOptions = {}): UseTaskCreateReturn => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: taskService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      options.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options.onError?.(error);
    },
  });

  return {
    createTask: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};
