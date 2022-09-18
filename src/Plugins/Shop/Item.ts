export interface ShopItem {
  DisplayName: string;
  Skin: number;
  Image: string;
  DefaultAmount: number;
  ShowDisplayName: boolean;
  BuyPrice: number;
  SellPrice: number;
  Currency: string;
}

export type ShopItemList = { [key: string]: ShopItem };
