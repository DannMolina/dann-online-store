import React from 'react';
import { Layout, Menu, Space, Tag, theme } from 'antd';

import { getCategories } from '../../mock/getCategories';
import { AppLogo } from '../Logo/Logo';
import { ProductFilterContext } from '../../provider/ProductFilter/ProductFilterProvider';
import { IProductFilterContext } from '../../provider/ProductFilter/types';
import { TagOutlined } from '@ant-design/icons';
import { MyCart } from '../Cart';

const { Header, Content, Sider } = Layout;

/**
 * Consist of sidebar, product list and cart
 * @returns Product Listing Page
 */
export const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const categories = getCategories();

  const { filter, setFilter }: IProductFilterContext
    = React.useContext(ProductFilterContext);

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <AppLogo />
        <MyCart />
      </Header>
      <Layout>
        <Sider width={200} style={{
          background: 'transparent',
          height: '100vh',
          padding: 10,
        }}>
          <Menu
            mode="inline"
            style={{
              textTransform: 'capitalize',
            }}
            defaultSelectedKeys={['1']}
            autoCapitalize='true'
            onClick={(e) => {
              setFilter(e.key);
            }}
            items={
              categories.map((category) => {
                return {
                  key: category,
                  label: category,
                };
              })
            }
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Space>
            Filtered by:
            <Tag color="green" style={{ margin: '16px 0', textTransform: 'capitalize', fontSize: 14 }}>
              <Space>
                <TagOutlined />{filter}
              </Space>
            </Tag>
          </Space>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
