/**
 * @constants Application Routes
 * @summary Centralized route path definitions
 * @domain core
 * @category constants
 */

export const ROUTES = {
  HOME: '/',
  TASK_CREATE: '/tasks/new',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
