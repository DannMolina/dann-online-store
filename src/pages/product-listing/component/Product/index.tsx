import React, { useState, useEffect } from 'react';
import { ProductItem } from './ProductItem';
import { getProducts } from '../../../../mock/getProducts';
import { IProductItem } from '../../../../mock/types';
import { Button, } from 'antd';
import { IProductFilterContext } from '../../../../provider/ProductFilter/types';
import { ProductFilterContext } from '../../../../provider/ProductFilter/ProductFilterProvider';
import { SortButton } from './SortButton';
import { SearchBar } from './SearchBar';

const DEFAULT_FILTER: string = 'all category';

export const ProductContainer: React.FC = () => {
  const { filter }: IProductFilterContext = React.useContext(ProductFilterContext);
  const products = getProducts();
  const filteredProducts = filter === DEFAULT_FILTER ? products : products.filter(item => item.category === filter);

  const [displayedProducts, setDisplayedProducts] = useState<IProductItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState<'lowToHigh' | 'highToLow' | ''>('lowToHigh');

  const loadMore = () => {
    const newIndex = currentIndex + 7;
    const newDisplayedProducts = [...displayedProducts, ...filteredProducts.slice(currentIndex, newIndex)];
    setCurrentIndex(newIndex);
    setDisplayedProducts(newDisplayedProducts);
  };

  const sortProducts = (productsToSort: IProductItem[], order: 'lowToHigh' | 'highToLow') => {
    const sortedProducts = productsToSort.slice();
    if (order === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.unitPrice - b.unitPrice);
    } else if (order === 'highToLow') {
      sortedProducts.sort((a, b) => b.unitPrice - a.unitPrice);
    }
    return sortedProducts;
  };

  const handleSort = (order: 'lowToHigh' | 'highToLow') => {
    let sortedItems: IProductItem[] = displayedProducts;
    if (order !== sortOrder) {
      sortedItems = sortProducts(filteredProducts, order);
      setSortOrder(order);
    }
    setDisplayedProducts(sortedItems.slice(0, currentIndex + 7));
  };

  useEffect(() => {
    let updatedProducts = filteredProducts;
    if (sortOrder === 'lowToHigh' || sortOrder === 'highToLow') {
      updatedProducts = sortProducts(filteredProducts, sortOrder);
    }
    setDisplayedProducts(updatedProducts.slice(0, currentIndex + 7));
  }, [filter, sortOrder, currentIndex]);

  return (
    <React.Fragment>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <SearchBar products={products} setDisplayedProducts={setDisplayedProducts} />
        <SortButton handleSort={handleSort} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
      <ProductItem data={displayedProducts} />
      <Button onClick={loadMore}>Load More</Button>
    </React.Fragment>
  );
}