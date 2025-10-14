/**
 * @constants Application Routes
 * @summary Centralized route path definitions
 * @domain core
 * @category constants
 */

export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
