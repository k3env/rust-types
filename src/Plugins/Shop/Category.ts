export interface ShopCategory {
  Image: string;
  Permission: string;
  Sale: number;
  Items: string[];
}

export type ShopCategoryList = { [key: string]: ShopCategory };
