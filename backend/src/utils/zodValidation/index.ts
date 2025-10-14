import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas
 * Provides reusable validation patterns
 */

export const zString = z.string().min(1, 'stringRequired');
export const zNullableString = z.string().nullable();

export const zName = z.string().min(1, 'nameRequired').max(100, 'nameTooLong');
export const zNullableDescription = z
  .string()
  .max(500, 'descriptionTooLong')
  .nullable()
  .default('');

export const zFK = z.coerce.number().int().positive('invalidId');
export const zNullableFK = z.coerce.number().int().positive('invalidId').nullable();

export const zBit = z.coerce.number().int().min(0).max(1);

export const zDateString = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: 'invalidDate',
});

export const zEmail = z.string().email('invalidEmail');

export const zNumeric = z.coerce.number();
export const zPositiveNumeric = z.coerce.number().positive('valueMustBePositive');

export const zPriority = z.coerce.number().int().min(0).max(2, 'invalidPriority');
export const zStatus = z.coerce.number().int().min(0).max(2, 'invalidStatus');
