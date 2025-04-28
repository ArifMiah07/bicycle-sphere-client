import React from 'react';
import { useState } from 'react';

import { Form, Input, Button, notification, Modal } from 'antd';
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';

const PasswordUpdate = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const auth = getAuth();

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      notification.error({
        message: 'Password Mismatch',
        description: 'The new password and confirmation password do not match.',
      });
      return;
    }

    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);

        setIsModalVisible(true);
        form.resetFields();
      }
    } catch (error: any) {
      notification.error({
        message: 'Error Updating Password',
        description: error.message,
      });
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h3>Update Password</h3>
      <Form form={form} layout="vertical" onFinish={handlePasswordUpdate}>
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[{ required: true, message: 'Please input your current password!' }]}
        >
          <Input.Password
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your new password!' }]}
        >
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Password
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Password Updated"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        okText="OK"
      >
        <p>Your password has been updated successfully!</p>
      </Modal>
    </div>
  );
};

export default PasswordUpdate;
