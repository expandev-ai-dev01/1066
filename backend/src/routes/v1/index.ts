import { Router } from 'express';
import externalRoutes from './externalRoutes';
import internalRoutes from './internalRoutes';

const router = Router();

/**
 * @summary
 * V1 API router
 *
 * @route /api/v1/external - Public endpoints
 * @route /api/v1/internal - Authenticated endpoints
 */
router.use('/external', externalRoutes);
router.use('/internal', internalRoutes);

export default router;
