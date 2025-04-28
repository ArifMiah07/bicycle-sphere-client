import React, { useState } from 'react';
import { ProductOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { Link } from 'react-router-dom';

type SizeType = ConfigProviderProps['componentSize'];

const UserDash: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large');
  return (
    <>
      <div className="h-screen text-center">
        <h1 className="my-4 text-3xl font-extrabold">Welcome to User Dashboard</h1>
        <div className="flex justify-center">
          <Flex gap="small" align="flex-start" vertical>
            <Flex gap="small" wrap>
              <Button type="primary" icon={<ProductOutlined />} size={size}>
                <Link to="/user/updatePassword">Profile Setting</Link>
              </Button>
              <Button type="primary" icon={<ShoppingCartOutlined />} size={size}>
                <Link to="/user/orders">Orders</Link>
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default UserDash;
