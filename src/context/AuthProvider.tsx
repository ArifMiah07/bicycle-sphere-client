import React, { useState, useEffect } from 'react';
import { auth, db } from '@/firebase/firebase.init';
// Firebase auth and db
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AuthContext from './AuthContext'; // Import the AuthContext
import { AuthInfo } from '@/types';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Admin role status
  const [isCustomer, setIsCustomer] = useState<boolean>(false); // Customer role status

  // Function to create a new user
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to log in a user
  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Monitor authentication state and fetch the role from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Set loading true during the auth state change process

      if (currentUser) {
        // If a user is authenticated, fetch user data from Firestore
        const userRef = doc(db, 'users', currentUser.uid); // Reference to the user's Firestore document
        const userDoc = await getDoc(userRef); // Get the document

        if (userDoc.exists()) {
          const userData = userDoc.data(); // Extract user data from Firestore
          setUser({ ...userData, uid: currentUser.uid }); // Store user data including the UID
          setIsAdmin(userData.role === 'admin'); // Set isAdmin based on the user's role
          setIsCustomer(userData.role === 'customer'); // Set isCustomer based on the user's role
        } else {
          setUser(currentUser); // If no Firestore data exists, store the Firebase user object
          setIsAdmin(false); // Default to non-admin
          setIsCustomer(false); // Default to non-customer
        }
      } else {
        setUser(null); // Set user to null if no user is authenticated
        setIsAdmin(false); // Ensure isAdmin is false if no user
        setIsCustomer(false); // Ensure isCustomer is false if no user
      }

      setLoading(false); // Set loading to false after auth state is checked
    });

    return () => unsubscribe(); // Clean up the listener when the component is unmounted
  }, []);

  // The value that will be provided via context
  const authInfo: AuthInfo = {
    user,
    loading,
    isAdmin,
    isCustomer, // Include isCustomer in the context value
    createUser,
    loginUser,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
