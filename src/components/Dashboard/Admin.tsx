import React, { useState } from 'react';
import {
  DownloadOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { Link } from 'react-router-dom';

type SizeType = ConfigProviderProps['componentSize'];

const Admin: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large');
  return (
    <>
      <div className="h-screen text-center">
        <h1 className="my-4 text-3xl font-extrabold">Welcome to Admin Dashboard</h1>
        <div className="flex justify-center">
          <Flex gap="small" align="flex-start" vertical>
            <Flex gap="small" wrap>
              <Button type="primary" icon={<UserAddOutlined />} size={size}>
                <Link to="/admin/users-management">Users</Link>
              </Button>
              <Button type="primary" icon={<ProductOutlined />} size={size}>
                <Link to="/admin/products">Products</Link>
              </Button>
              <Button type="primary" icon={<ShoppingCartOutlined />} size={size}>
                <Link to="/admin/orders">Orders</Link>
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default Admin;
