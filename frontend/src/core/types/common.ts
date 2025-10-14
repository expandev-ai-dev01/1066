/**
 * @types Common Types
 * @summary Common type definitions used across the application
 * @domain core
 * @category types
 */

export type ID = string | number;

export type Timestamp = string;

export type PaginationParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
};
