import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

/**
 * @summary
 * Main API router with version management
 *
 * @route /api
 * @version v1 - Current stable version
 */
router.use('/v1', v1Routes);

export default router;
