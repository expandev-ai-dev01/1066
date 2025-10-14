import type { CreateTaskDto, CreateTaskResponse } from '../../types';

export type UseTaskCreateOptions = {
  onSuccess?: (data: CreateTaskResponse) => void;
  onError?: (error: Error) => void;
};

export type UseTaskCreateReturn = {
  createTask: (data: CreateTaskDto) => Promise<CreateTaskResponse>;
  isCreating: boolean;
  error: Error | null;
  reset: () => void;
};
