import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/firebase.init'; // Ensure Firestore is imported from firebase.init.ts
import { collection, getDocs } from 'firebase/firestore';

const { Header, Content, Sider } = Layout;

const menuItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'Users',
    link: '/admin/users-management',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'Products',
    link: '/admin/products',
  },
  {
    key: '4',
    icon: <UserOutlined />,
    label: 'Orders',
    link: '/admin/orders',
  },
];

const AdminDashboard: React.FC = () => {
  const { isAdmin, loading } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    }
  }, [loading, isAdmin, navigate]);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setTableLoading(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return null; // If not admin, return null

  return (
    <div className="mt-24">
      <Layout className="">
        <Sider>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 16, display: 'flex', justifyContent: 'space-between' }}>
            <h2>Admin Dashboard</h2>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
