import { authenticatedClient } from '@/core/lib/api';
import type { CreateTaskDto, CreateTaskResponse } from '../types';

/**
 * @service taskService
 * @summary Task management service for authenticated endpoints
 * @domain task
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/task/...
 *
 * Authentication token is automatically added by interceptor.
 */
export const taskService = {
  /**
   * @endpoint POST /api/v1/internal/task
   * @summary Creates new task
   * @param {CreateTaskDto} data - Task creation data
   * @returns {Promise<CreateTaskResponse>} Created task response
   * @throws {Error} Validation errors or server errors
   */
  async create(data: CreateTaskDto): Promise<CreateTaskResponse> {
    const response = await authenticatedClient.post('/task', data);
    return response.data.data;
  },
};
