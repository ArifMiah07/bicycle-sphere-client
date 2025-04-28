import React from 'react';
import { Button } from 'antd';
import { db } from '@/firebase/firebase.init';
import { doc, updateDoc } from 'firebase/firestore';

const UpdateRole: React.FC<{ userId: string; currentRole: string }> = ({ userId, currentRole }) => {
  const handleUpdateRole = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        role: currentRole === 'admin' ? 'customer' : 'admin', // Toggle role
      });
      alert('User role updated successfully!');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <Button onClick={handleUpdateRole}>
      {currentRole === 'admin' ? 'Demote to Customer' : 'Promote to Admin'}
    </Button>
  );
};

export default UpdateRole;
