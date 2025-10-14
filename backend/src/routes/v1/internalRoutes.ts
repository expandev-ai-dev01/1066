import { Router } from 'express';
import * as taskController from '@/api/v1/internal/task/controller';
import * as categoryController from '@/api/v1/internal/category/controller';

const router = Router();

/**
 * @summary
 * Internal (authenticated) routes configuration
 * Routes requiring authentication
 *
 * @route /api/v1/internal
 */

/**
 * @summary
 * Task routes
 * @route POST /api/v1/internal/task - Create new task
 */
router.post('/task', taskController.postHandler);

/**
 * @summary
 * Category routes
 * @route GET /api/v1/internal/category - List categories
 */
router.get('/category', categoryController.getHandler);

export default router;
