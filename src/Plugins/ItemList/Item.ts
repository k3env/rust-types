import { Skin } from "./Skin";

export interface Item {
  id: number;
  name: string;
  shortname: string;
  category: string;
  skins: { [key: string]: Skin };
}
