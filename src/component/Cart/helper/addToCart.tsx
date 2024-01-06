import { IProductItemWithQuantity } from "../types/types";

export const addToCart = (product: IProductItemWithQuantity) => {
  // Get the existing cart items from localStorage or initialize an empty array
  const existingCartItemsString = localStorage.getItem('cart');
  const existingCartItems = existingCartItemsString ? JSON.parse(existingCartItemsString) : [];

  // Add the new product to the cart
  const updatedCart = [...existingCartItems, product];

  // Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  // Get the cart items from localStorage
  const cartItemsString = localStorage.getItem('cart');

  // Function to merge items with the same ID and calculate total unit price
  const mergeCartItems = (items: IProductItemWithQuantity[]): IProductItemWithQuantity[] => {
    const mergedItemsMap = items.reduce((acc, item) => {
      const existingItem = acc.get(item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.unitPrice += item.unitPrice * item.quantity;
      } else {
        acc.set(item.id, { ...item });
      }
      return acc;
    }, new Map<string, IProductItemWithQuantity>());

    return Array.from(mergedItemsMap.values());
  };

  // Parse the string to an array of items or use an empty array if it's null
  const parsedCartItems: IProductItemWithQuantity[] = cartItemsString ? JSON.parse(cartItemsString) : [];

  // Merge items with the same ID and calculate the total unit price
  const mergedCartItems = mergeCartItems(parsedCartItems);

  localStorage.setItem('cartItemCount', JSON.stringify(mergedCartItems));
  window.dispatchEvent(new Event("storage"));

};