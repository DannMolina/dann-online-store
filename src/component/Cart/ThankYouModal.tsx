import React from 'react';
import { Button, Modal } from 'antd';

interface IThankYouModal {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ThankYouModal = ({ modalVisible, setModalVisible }: IThankYouModal) => {
  const handleModalOk = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      title="Thank You for Purchasing!"
      visible={modalVisible}
      onCancel={handleModalOk}
      footer={[
        <Button key="clear" onClick={() => {
          handleModalOk();
          localStorage.removeItem('cart');
          localStorage.removeItem('cartItemCount');
          window.dispatchEvent(new Event("storage"));
        }}>Close</Button>,
      ]}
    >
      <div style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
      </div>
      {/* <p style={{ fontSize: '16px', margin: '0' }}>Thank You for Purchasing!</p> */}
    </Modal>
  );
};

export default ThankYouModal;
