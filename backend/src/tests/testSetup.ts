/**
 * @summary
 * Global test environment setup
 * Configures test environment and shared utilities
 */

import { config } from '@/config';

/**
 * @summary
 * Setup test environment
 */
beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

/**
 * @summary
 * Cleanup after all tests
 */
afterAll(() => {
  // Cleanup logic here
});
