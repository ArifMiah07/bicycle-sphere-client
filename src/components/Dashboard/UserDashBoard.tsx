import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, ProfileOutlined, ContainerOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Link, Outlet } from 'react-router-dom';

const menuItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Dashboard',
    link: '/user/udashboard',
  },
  {
    key: '2',
    icon: <ContainerOutlined />,
    label: 'Orders',
    link: '/user/orders',
  },
  {
    key: '3',
    icon: <ProfileOutlined />,
    label: 'Profile Settings',
    link: '/user/updatePassword',
  },
];

const UserDashBoard = () => {
  return (
    <div className="mt-24 h-[500px]">
      <Layout className="h-full">
        <Sider width={200} className="site-layout-background">
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 16, display: 'flex', justifyContent: 'space-between' }}>
            <h2>User Dashboard</h2>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            {/* Nested route will render here */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default UserDashBoard;
