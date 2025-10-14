import { authenticatedClient } from '@/core/lib/api';
import type { CategoryListResponse } from '../types';

/**
 * @service categoryService
 * @summary Category management service for authenticated endpoints
 * @domain category
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/category/...
 *
 * Authentication token is automatically added by interceptor.
 */
export const categoryService = {
  /**
   * @endpoint GET /api/v1/internal/category
   * @summary Fetches list of categories for authenticated user
   * @returns {Promise<CategoryListResponse>} List of categories
   * @throws {Error} Server errors
   */
  async list(): Promise<CategoryListResponse> {
    const response = await authenticatedClient.get('/category');
    return response.data.data;
  },
};
