/**
 * @summary
 * Category business logic and CRUD operations
 * Handles category creation and listing
 *
 * @module categoryRules
 * @domain category
 * @category business-logic
 */

import { dbRequest, ExpectedReturn } from '@/utils/database';
import { CategoryCreateRequest, CategoryEntity, CategoryListResponse } from './categoryTypes';

/**
 * @summary
 * Creates a new category
 *
 * @function categoryCreate
 * @module category
 *
 * @param {CategoryCreateRequest} params - Category creation parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {string} params.name - Category name
 * @param {string} params.color - Category color (optional, defaults to #CCCCCC)
 *
 * @returns {Promise<CategoryEntity>} Created category entity
 *
 * @throws {Error} When name validation fails
 * @throws {Error} When duplicate category name exists
 * @throws {Error} When database operation fails
 */
export async function categoryCreate(params: CategoryCreateRequest): Promise<CategoryEntity> {
  const result = await dbRequest(
    '[functional].[spCategoryCreate]',
    {
      idAccount: params.idAccount,
      idUser: params.idUser,
      name: params.name,
      color: params.color || '#CCCCCC',
    },
    ExpectedReturn.Single
  );

  return result;
}

/**
 * @summary
 * Lists all categories for a user
 *
 * @function categoryList
 * @module category
 *
 * @param {number} idAccount - Account identifier
 * @param {number} idUser - User identifier
 *
 * @returns {Promise<CategoryListResponse[]>} List of categories
 *
 * @throws {Error} When database operation fails
 */
export async function categoryList(
  idAccount: number,
  idUser: number
): Promise<CategoryListResponse[]> {
  const result = await dbRequest(
    '[functional].[spCategoryList]',
    {
      idAccount,
      idUser,
    },
    ExpectedReturn.Multi
  );

  return result;
}
