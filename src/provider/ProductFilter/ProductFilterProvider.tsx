import React, { ReactNode, createContext, useState } from "react";
import { IProductFilterContext } from "./types";

// Create a new context
export const ProductFilterContext = createContext<IProductFilterContext>(
  {} as IProductFilterContext
);

// Create a component that will provide the context value
export const ProductFilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<any>("all category");

  return <ProductFilterContext.Provider value={{ filter, setFilter }}>{children}</ProductFilterContext.Provider>;
};

export default ProductFilterProvider;
