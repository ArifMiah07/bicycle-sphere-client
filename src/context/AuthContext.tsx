import { AuthInfo } from '@/types';
import { createContext, useContext } from 'react';

const AuthContext = createContext<AuthInfo | null>(null);

export const useAuth = (): AuthInfo => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
