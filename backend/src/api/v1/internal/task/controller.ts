/**
 * @api {post} /internal/task Create Task
 * @apiName CreateTask
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new task with optional category creation
 *
 * @apiParam {String} title Task title (3-100 characters)
 * @apiParam {String} [description] Task description (max 500 characters)
 * @apiParam {Date} [deadline] Task deadline (cannot be in the past)
 * @apiParam {Number} [priority] Task priority (0=Low, 1=Medium, 2=High)
 * @apiParam {Number} [idCategory] Existing category ID
 * @apiParam {String} [newCategory] New category name (2-50 characters)
 *
 * @apiSuccess {Number} idTask Task identifier
 * @apiSuccess {String} title Task title
 * @apiSuccess {Date} dateCreated Creation timestamp
 * @apiSuccess {Boolean} [categoryCreated] Whether new category was created
 * @apiSuccess {String} [categoryName] Name of created category
 *
 * @apiError {String} titleRequired Title is required
 * @apiError {String} titleTooShort Title must be at least 3 characters
 * @apiError {String} titleTooLong Title must be at most 100 characters
 * @apiError {String} descriptionTooLong Description must be at most 500 characters
 * @apiError {String} deadlineInPast Deadline cannot be in the past
 * @apiError {String} invalidPriority Invalid priority value
 * @apiError {String} categoryDoesntExist Selected category doesn't exist
 * @apiError {String} newCategoryTooShort New category name must be at least 2 characters
 * @apiError {String} newCategoryTooLong New category name must be at most 50 characters
 * @apiError {String} conflictingCategorySelection Cannot select existing category and create new one
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  CrudController,
  errorResponse,
  StatusGeneralError,
  successResponse,
} from '@/middleware/crud';
import { taskCreate } from '@/services/task';
import { TaskPriority } from '@/services/task/taskTypes';

const securable = 'TASK';

const bodySchema = z.object({
  title: z
    .string()
    .min(3, 'titleTooShort')
    .max(100, 'titleTooLong')
    .refine((val) => val.trim().length > 0, { message: 'titleRequired' }),
  description: z.string().max(500, 'descriptionTooLong').optional().default(''),
  deadline: z
    .string()
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      { message: 'deadlineInPast' }
    )
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  priority: z.coerce
    .number()
    .int()
    .min(0)
    .max(2, 'invalidPriority')
    .optional()
    .default(TaskPriority.Medium),
  idCategory: z.coerce.number().int().positive('invalidCategoryId').optional(),
  newCategory: z
    .string()
    .min(2, 'newCategoryTooShort')
    .max(50, 'newCategoryTooLong')
    .refine((val) => !val || val.trim().length > 0, { message: 'newCategoryInvalid' })
    .optional(),
});

/**
 * @summary
 * Handles task creation POST request
 *
 * @function postHandler
 * @module task
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 *
 * @returns {Promise<void>}
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);

  /**
   * @validation Request validation and security check
   * @throw {ValidationError}
   */
  const [validated, error] = await operation.create(req, bodySchema);

  if (!validated) {
    return next(error);
  }

  try {
    /**
     * @rule {BR-003} Validate category selection logic
     */
    if (validated.params.idCategory && validated.params.newCategory) {
      res.status(400).json(errorResponse('conflictingCategorySelection'));
      return;
    }

    /**
     * @rule {BR-001,BR-002,BR-004,BR-005} Execute task creation with business rules
     */
    const data = await taskCreate({
      ...validated.credential,
      ...validated.params,
    });

    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else if (error.message === 'conflictingCategorySelection') {
      res.status(400).json(errorResponse(error.message));
    } else if (error.message === 'categoryDoesntExist') {
      res.status(404).json(errorResponse(error.message));
    } else if (error.message === 'duplicateCategoryName') {
      res.status(409).json(errorResponse(error.message));
    } else {
      next(StatusGeneralError);
    }
  }
}
