/**
 * @types Task Domain Types
 * @summary Type definitions for task management domain
 * @domain task
 * @category types
 */

export type TaskPriority = 0 | 1 | 2;

export type TaskStatus = 'Pendente' | 'Concluída';

export type Task = {
  idTask: number;
  title: string;
  description?: string;
  deadline?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  dateCreated: Date;
  idCategory?: number;
  idUser: number;
};

export type CreateTaskDto = {
  title: string;
  description?: string;
  deadline?: Date;
  priority?: TaskPriority;
  idCategory?: number;
  newCategory?: string;
};

export type CreateTaskResponse = {
  idTask: number;
  title: string;
  dateCreated: Date;
  categoryCreated?: boolean;
  categoryName?: string;
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  0: 'Baixa',
  1: 'Média',
  2: 'Alta',
};

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  0: 'text-gray-600 bg-gray-100',
  1: 'text-yellow-600 bg-yellow-100',
  2: 'text-red-600 bg-red-100',
};
