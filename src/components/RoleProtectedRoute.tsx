import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className='mt-24'>Loading...</div>;
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  // If logged in but role is not allowed
  if (!allowedRoles.includes(user.role ?? '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is allowed
  return <>{children}</>;
};

export default RoleProtectedRoute;
