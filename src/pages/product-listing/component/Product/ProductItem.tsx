import React from 'react';
import '../../styles/styles.css';
import { Button } from 'antd';
import { IProductItem } from '../../../../mock/types';
import { addToCart } from '../../../../component/Cart/helper/addToCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProductItemProps {
  data: IProductItem[];
}

export const ProductItem = ({ data }: IProductItemProps) => {
  return (
    <React.Fragment>
      {
        data.length > 0 && data.map((item, key) => {
          return (
            <div className="product" key={key}>
              <img src={item.imageUrl} alt="product" className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{item.productName}</h2>
                <p className="product-category">{item.category}</p>
                <p className="product-description">{item.description}</p>
                <p className="product-price">₱{item.unitPrice}</p>
                <Button onClick={() => {
                  addToCart({ ...item, quantity: 1 });
                  toast.success(`${item.productName} added to cart!`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }}>Add to cart</Button>
              </div>
            </div>
          )
        })
      }
      <ToastContainer />
    </React.Fragment>
  );
}


