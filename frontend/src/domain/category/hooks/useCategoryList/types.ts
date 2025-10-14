import type { Category } from '../../types';

export type UseCategoryListReturn = {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};
