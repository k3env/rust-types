export interface Category {
  Image: string;
  Permission: string;
  Sale: number;
  Items: string[];
}

export type ShopCategoryList = Map<string, Category>;
