import { useState, useEffect } from 'react';
import { Modal, Button, Badge, List } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { IProductItemWithQuantity } from './types/types';
import ThankYouModal from './ThankYouModal';

export const MyCart: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<IProductItemWithQuantity[]>([] as unknown as IProductItemWithQuantity[]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

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

  useEffect(() => {
    // Update state with the merged cart items
    setCartItems(mergedCartItems);
  }, [cartItemsString]);

  useEffect(() => {
    // Calculate the total price when cart items change
    const totalPriceSum = cartItems.reduce((acc, item) => acc + item.unitPrice, 0);
    setTotalPrice(totalPriceSum);
  }, [cartItems]);

  // Function to handle increasing quantity
  const increaseQuantity = (item: IProductItemWithQuantity) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        const updatedQuantity = cartItem.quantity + 1;
        const updatedUnitPrice = cartItem.unitPrice + cartItem.unitPrice / cartItem.quantity; // Update unit price
        return { ...cartItem, quantity: updatedQuantity, unitPrice: updatedUnitPrice };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
    // Update localStorage here with the updated cart items
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    window.dispatchEvent(new Event("storage"));
  };

  const decreaseQuantity = (item: IProductItemWithQuantity) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 0) {
        const updatedQuantity = cartItem.quantity - 1;

        if (updatedQuantity === 0) {
          // Filter out item if quantity reaches 0
          return null; // Returning null will remove this item
        } else {
          const updatedUnitPrice = cartItem.unitPrice - (cartItem.unitPrice / cartItem.quantity); // Update unit price
          return { ...cartItem, quantity: updatedQuantity, unitPrice: updatedUnitPrice };
        }
      }
      return cartItem;
    }).filter(Boolean); // Filter out null values (items with quantity 0)

    setCartItems(updatedCartItems as IProductItemWithQuantity[]);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    localStorage.setItem('cartItemCount', cartItems.length.toString());
    window.dispatchEvent(new Event("storage"));
  };

  // Badge
  const [badge, setBadge] = useState<number>(0);
  useEffect(() => {
    const handleStorageChange = () => {
      const cartItemsCount = localStorage.getItem('cartItemCount');
      const totalCount = cartItemsCount ? JSON.parse(cartItemsCount).length : 0;
      setBadge(totalCount)
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [badge]);

  const [checkOutModal, setCheckOutModal] = useState(false);

  const checkOut = () => {
    setCheckOutModal(true);
    setVisible(false);
  }

  return (
    <div>
      <div onClick={showModal}>
        <Badge count={badge || cartItems.length}>
          <ShoppingCartOutlined style={{ fontSize: '30px', color: "#fff" }} />
        </Badge>
      </div>
      <ThankYouModal modalVisible={checkOutModal} setModalVisible={setCheckOutModal} />
      <Modal
        title="Shopping Cart"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="clear" danger onClick={() => {
            localStorage.removeItem('cart');
            localStorage.removeItem('cartItemCount');
            window.dispatchEvent(new Event("storage"));
            setCartItems([]);
          }}>Clear Cart</Button>,
          <Button key="submit" disabled={cartItems.length === 0} type="primary" onClick={checkOut}>
            Checkout
          </Button>,
        ]}
        style={{ maxHeight: '80vh' }}
      >
        {/* <ThankYouModal /> */}
        <div style={{ overflow: 'auto', maxHeight: 'calc(80vh - 108px)' }}>
          <List
            dataSource={cartItems}
            renderItem={(item: IProductItemWithQuantity, index: number) => (
              cartItems.length > 0 && item.id &&
              <List.Item style={{ display: 'flex' }} key={index}>
                <span style={{ flex: 3 }}>{item.productName}</span>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button disabled={!item.quantity} onClick={() => decreaseQuantity(item)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button disabled={!item.quantity} onClick={() => increaseQuantity(item)}>+</Button>
                </div>
                <span style={{ flex: 1, textAlign: 'right' }}>₱{item.unitPrice.toFixed(2)}</span>
              </List.Item>
            )}
          />
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Items: {cartItems.length}</span>
          <span>Total Amount: ₱{totalPrice.toFixed(2)}</span>
        </div>
      </Modal>
    </div>
  );
};


