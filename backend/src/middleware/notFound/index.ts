import { Request, Response } from 'express';

/**
 * @summary
 * 404 Not Found middleware
 * Handles requests to undefined routes
 *
 * @middleware notFoundMiddleware
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
      timestamp: new Date().toISOString(),
    },
  });
}
