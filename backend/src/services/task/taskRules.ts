/**
 * @summary
 * Task business logic and CRUD operations
 * Handles task creation with category management
 *
 * @module taskRules
 * @domain task
 * @category business-logic
 */

import {
  dbRequest,
  ExpectedReturn,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} from '@/utils/database';
import { TaskCreateRequest, TaskCreateResponse, TaskPriority, TaskStatus } from './taskTypes';

/**
 * @summary
 * Creates a new task with optional category creation
 *
 * @function taskCreate
 * @module task
 *
 * @param {TaskCreateRequest} params - Task creation parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {string} params.title - Task title
 * @param {string} params.description - Task description (optional)
 * @param {Date} params.deadline - Task deadline (optional)
 * @param {TaskPriority} params.priority - Task priority (optional, defaults to Medium)
 * @param {number} params.idCategory - Existing category ID (optional)
 * @param {string} params.newCategory - New category name (optional)
 *
 * @returns {Promise<TaskCreateResponse>} Created task information
 *
 * @throws {Error} When title validation fails
 * @throws {Error} When both idCategory and newCategory are provided
 * @throws {Error} When category doesn't exist
 * @throws {Error} When new category name is invalid
 * @throws {Error} When database operation fails
 */
export async function taskCreate(params: TaskCreateRequest): Promise<TaskCreateResponse> {
  const transaction = await beginTransaction();

  try {
    let finalCategoryId = params.idCategory || null;
    let categoryCreated = false;
    let categoryName: string | undefined;

    /**
     * @validation Validate category selection logic
     * @rule {BR-003} Cannot select existing category and create new one simultaneously
     * @throw {conflictingCategorySelection}
     */
    if (params.idCategory && params.newCategory) {
      await rollbackTransaction(transaction);
      throw new Error('conflictingCategorySelection');
    }

    /**
     * @rule {BR-002} Create new category if specified
     * @link {@link /docs/functional/task-management.md#category-creation | Category Creation}
     */
    if (params.newCategory) {
      const categoryResult = await dbRequest(
        '[functional].[spCategoryCreate]',
        {
          idAccount: params.idAccount,
          idUser: params.idUser,
          name: params.newCategory,
          color: '#CCCCCC',
        },
        ExpectedReturn.Single,
        transaction
      );

      finalCategoryId = categoryResult.idCategory;
      categoryCreated = true;
      categoryName = params.newCategory;
    }

    /**
     * @rule {BR-004,BR-005} Set default status and creation date
     */
    const taskResult = await dbRequest(
      '[functional].[spTaskCreate]',
      {
        idAccount: params.idAccount,
        idUser: params.idUser,
        title: params.title,
        description: params.description || '',
        deadline: params.deadline || null,
        priority: params.priority !== undefined ? params.priority : TaskPriority.Medium,
        idCategory: finalCategoryId,
        status: TaskStatus.Pending,
      },
      ExpectedReturn.Single,
      transaction
    );

    await commitTransaction(transaction);

    return {
      idTask: taskResult.idTask,
      title: taskResult.title,
      dateCreated: taskResult.dateCreated,
      categoryCreated,
      categoryName,
    };
  } catch (error: any) {
    await rollbackTransaction(transaction);
    throw error;
  }
}
