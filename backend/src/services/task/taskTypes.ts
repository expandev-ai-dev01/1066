/**
 * @summary
 * Task service type definitions
 * Defines interfaces and types for task management operations
 *
 * @module taskTypes
 * @domain task
 * @category types
 */

/**
 * @interface TaskEntity
 * @description Represents a task entity in the system
 *
 * @property {number} idTask - Unique task identifier
 * @property {number} idAccount - Associated account identifier
 * @property {number} idUser - User identifier who owns the task
 * @property {string} title - Task title
 * @property {string} description - Task description
 * @property {Date | null} deadline - Task deadline date
 * @property {TaskPriority} priority - Task priority level
 * @property {number | null} idCategory - Associated category identifier
 * @property {TaskStatus} status - Current task status
 * @property {Date} dateCreated - Creation timestamp
 * @property {Date} dateModified - Last modification timestamp
 * @property {boolean} deleted - Soft delete flag
 */
export interface TaskEntity {
  idTask: number;
  idAccount: number;
  idUser: number;
  title: string;
  description: string;
  deadline: Date | null;
  priority: TaskPriority;
  idCategory: number | null;
  status: TaskStatus;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}

/**
 * @enum TaskPriority
 * @description Task priority levels
 */
export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
}

/**
 * @enum TaskStatus
 * @description Task status values
 */
export enum TaskStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
}

/**
 * @interface TaskCreateRequest
 * @description Request parameters for creating a new task
 */
export interface TaskCreateRequest {
  idAccount: number;
  idUser: number;
  title: string;
  description?: string;
  deadline?: Date;
  priority?: TaskPriority;
  idCategory?: number;
  newCategory?: string;
}

/**
 * @interface TaskCreateResponse
 * @description Response data after task creation
 */
export interface TaskCreateResponse {
  idTask: number;
  title: string;
  dateCreated: Date;
  categoryCreated?: boolean;
  categoryName?: string;
}
