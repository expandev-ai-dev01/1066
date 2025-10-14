import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';
import type { UseCategoryListReturn } from './types';

/**
 * @hook useCategoryList
 * @summary Hook for fetching list of categories with caching
 * @domain category
 * @type domain-hook
 * @category data
 *
 * @returns {UseCategoryListReturn} Categories list and loading state
 *
 * @examples
 * ```tsx
 * const { categories, isLoading } = useCategoryList();
 * ```
 */
export const useCategoryList = (): UseCategoryListReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.list,
    staleTime: 5 * 60 * 1000,
  });

  return {
    categories: data || [],
    isLoading,
    error,
    refetch,
  };
};
