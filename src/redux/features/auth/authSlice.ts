// authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a user interface with an 'active' property
interface AuthState {
  user: {
    role?: string;
    name: string;
    email: string;
  } | null;
  users: { id: string; name: string; email: string; active: boolean }[]; // Users array to track multiple users
}

const initialState: AuthState = {
  user: null,
  users: [
    // Example users for demonstration
    { id: '1', name: 'John Doe', email: 'john@example.com', active: true },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', active: true },
  ],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the current authenticated user
    setAuth: (state, action: PayloadAction<{ user: { name: string; email: string } }>) => {
      state.user = action.payload.user;
    },

    // Action to deactivate a user
    deactivateUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload; // User ID to deactivate
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.active = false; // Deactivate the user
      }
    },

    // Action to activate a user (optional for completeness)
    activateUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload; // User ID to activate
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.active = true; // Activate the user
      }
    },
  },
});

export const { setAuth, deactivateUser, activateUser } = authSlice.actions; // Export actions
export default authSlice.reducer;
