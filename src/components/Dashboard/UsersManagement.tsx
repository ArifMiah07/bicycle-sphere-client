import { deactivateUser, activateUser } from '@/redux/features/auth/authSlice';
import { Table, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const UsersManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.auth.users); // Adjust the selector based on your store structure

  const handleDeactivate = (userId: string) => {
    dispatch(deactivateUser(userId)); // Dispatch deactivateUser action
  };

  const handleActivate = (userId: string) => {
    dispatch(activateUser(userId)); // Dispatch activateUser action
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (text: boolean) => (text ? 'Active' : 'Deactivated'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text: string, record: any) => (
        <div>
          <Button
            onClick={() => handleDeactivate(record.id)}
            disabled={!record.active} // Disable deactivate for already deactivated users
          >
            Deactivate
          </Button>
          <Button
            onClick={() => handleActivate(record.id)}
            disabled={record.active} // Disable activate for already active users
          >
            Activate
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen">
      <h1>Users Management</h1>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </div>
  );
};

export default UsersManagement;
