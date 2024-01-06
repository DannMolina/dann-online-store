import { items } from "./items";

export const getCategories = (): string[] => {
	const categories = [...items.map((product) => product.category)];

	// Remove duplicates
	const filtered = categories.filter((value, index) => categories.indexOf(value) === index);

	return ["all category", ...filtered];
};
