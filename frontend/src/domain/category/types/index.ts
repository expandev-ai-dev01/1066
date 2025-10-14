/**
 * @types Category Domain Types
 * @summary Type definitions for category management domain
 * @domain category
 * @category types
 */

export type Category = {
  idCategory: number;
  name: string;
  color: string;
};

export type CategoryListResponse = Category[];
