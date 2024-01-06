import { useState } from "react";
import { IProductItem } from "../../../../mock/types";
import Search from "antd/es/input/Search";

interface ISearchBar {
  products: IProductItem[];
  setDisplayedProducts: React.Dispatch<React.SetStateAction<IProductItem[]>>;

}
/**
 * @param products 
 * @returns Search bar component
 */
export const SearchBar = ({ products, setDisplayedProducts }: ISearchBar) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (value: string) => {
    const searchText = value.toLowerCase().trim();
    setSearchText(searchText);
    const filteredProducts = products.filter((product: { productName: string; }) =>
      product.productName.toLowerCase().includes(searchText)
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value.toLowerCase().trim());
  };

  return (
    <div style={{ width: 300 }}>
      <Search
        placeholder="Search product name"
        onSearch={handleSearch}
        onChange={handleChange}
        value={searchText}
      />
    </div>
  );
};