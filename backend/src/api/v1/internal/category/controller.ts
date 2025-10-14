/**
 * @api {get} /internal/category List Categories
 * @apiName ListCategories
 * @apiGroup Category
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all categories for the authenticated user
 *
 * @apiSuccess {Number} idCategory Category identifier
 * @apiSuccess {String} name Category name
 * @apiSuccess {String} color Category color (hexadecimal)
 *
 * @apiError {String} UnauthorizedError User lacks permission
 * @apiError {String} ServerError Internal server error
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  CrudController,
  errorResponse,
  StatusGeneralError,
  successResponse,
} from '@/middleware/crud';
import { categoryList } from '@/services/category';

const securable = 'CATEGORY';

const querySchema = z.object({});

/**
 * @summary
 * Handles category listing GET request
 *
 * @function getHandler
 * @module category
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 *
 * @returns {Promise<void>}
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);

  /**
   * @validation Request validation and security check
   * @throw {ValidationError}
   */
  const [validated, error] = await operation.read(req, querySchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await categoryList(validated.credential.idAccount, validated.credential.idUser);

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(StatusGeneralError);
    }
  }
}
