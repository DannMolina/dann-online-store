import { items } from "./items";
import { IProductItem } from "./types";

export const getProducts = (): IProductItem[] => {
	return [...items];
};
