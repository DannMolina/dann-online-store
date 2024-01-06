import { IProductItem } from "../../../mock/types";

export interface IProductItemWithQuantity extends IProductItem {
  quantity: number;
}
