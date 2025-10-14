/**
 * @summary
 * Category service type definitions
 * Defines interfaces and types for category management operations
 *
 * @module categoryTypes
 * @domain category
 * @category types
 */

/**
 * @interface CategoryEntity
 * @description Represents a category entity in the system
 *
 * @property {number} idCategory - Unique category identifier
 * @property {number} idAccount - Associated account identifier
 * @property {number} idUser - User identifier who created the category
 * @property {string} name - Category name
 * @property {string} color - Category color (hexadecimal)
 * @property {Date} dateCreated - Creation timestamp
 * @property {boolean} deleted - Soft delete flag
 */
export interface CategoryEntity {
  idCategory: number;
  idAccount: number;
  idUser: number;
  name: string;
  color: string;
  dateCreated: Date;
  deleted: boolean;
}

/**
 * @interface CategoryCreateRequest
 * @description Request parameters for creating a new category
 */
export interface CategoryCreateRequest {
  idAccount: number;
  idUser: number;
  name: string;
  color?: string;
}

/**
 * @interface CategoryListResponse
 * @description Response data for category listing
 */
export interface CategoryListResponse {
  idCategory: number;
  name: string;
  color: string;
}
