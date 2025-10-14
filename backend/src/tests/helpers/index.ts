/**
 * @summary
 * Test helper functions
 * Shared utilities for test suites
 */

import { Request } from 'express';

/**
 * @summary
 * Creates mock Express request
 *
 * @param {any} params - Request parameters
 * @returns {Partial<Request>} Mock request object
 */
export function createMockRequest(params: any = {}): Partial<Request> {
  return {
    params: params.params || {},
    query: params.query || {},
    body: params.body || {},
    headers: params.headers || {},
  };
}

/**
 * @summary
 * Creates mock Express response
 *
 * @returns {any} Mock response object
 */
export function createMockResponse(): any {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}
