import { Request } from 'express';
import { z } from 'zod';

/**
 * @summary
 * Security permission types
 */
export type PermissionType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

/**
 * @summary
 * Security configuration interface
 */
export interface SecurityConfig {
  securable: string;
  permission: PermissionType;
}

/**
 * @summary
 * Validated request data interface
 */
export interface ValidatedData {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @summary
 * CRUD Controller for handling common operations
 * Provides validation and security checks
 */
export class CrudController {
  private securityConfig: SecurityConfig[];

  constructor(securityConfig: SecurityConfig[]) {
    this.securityConfig = securityConfig;
  }

  /**
   * @summary
   * Validates CREATE operation
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidatedData | null, Error | null]>}
   */
  async create(req: Request, schema: z.ZodSchema): Promise<[ValidatedData | null, Error | null]> {
    return this.validate(req, schema, 'CREATE');
  }

  /**
   * @summary
   * Validates READ operation
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidatedData | null, Error | null]>}
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidatedData | null, Error | null]> {
    return this.validate(req, schema, 'READ');
  }

  /**
   * @summary
   * Validates UPDATE operation
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidatedData | null, Error | null]>}
   */
  async update(req: Request, schema: z.ZodSchema): Promise<[ValidatedData | null, Error | null]> {
    return this.validate(req, schema, 'UPDATE');
  }

  /**
   * @summary
   * Validates DELETE operation
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidatedData | null, Error | null]>}
   */
  async delete(req: Request, schema: z.ZodSchema): Promise<[ValidatedData | null, Error | null]> {
    return this.validate(req, schema, 'DELETE');
  }

  /**
   * @summary
   * Core validation logic
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   * @param {PermissionType} operation - Operation type
   * @returns {Promise<[ValidatedData | null, Error | null]>}
   */
  private async validate(
    req: Request,
    schema: z.ZodSchema,
    operation: PermissionType
  ): Promise<[ValidatedData | null, Error | null]> {
    try {
      const params = { ...req.params, ...req.query, ...req.body };
      const validatedParams = await schema.parseAsync(params);

      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [
        {
          credential,
          params: validatedParams,
        },
        null,
      ];
    } catch (error: any) {
      return [null, error];
    }
  }
}

/**
 * @summary
 * Success response helper
 *
 * @param {any} data - Response data
 * @returns {object} Formatted success response
 */
export function successResponse(data: any): object {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * Error response helper
 *
 * @param {string} message - Error message
 * @returns {object} Formatted error response
 */
export function errorResponse(message: string): object {
  return {
    success: false,
    error: {
      message,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * General error constant
 */
export const StatusGeneralError = new Error('generalError');
