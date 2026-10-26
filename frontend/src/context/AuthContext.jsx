import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    apiRequest('/api/auth/me')
      .then(({ user: currentUser }) => setUser(currentUser))
      .catch((error) => {
        if (error.status !== 401) {
          console.error('Unable to restore the signed-in session:', error);
        }
      })
      .finally(() => setIsReady(true));
  }, []);

  const signup = async (details) => {
    const { user: newUser } = await apiRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(details),
    });
    setUser(newUser);
    return newUser;
  };

  const login = async (credentials) => {
    const { user: loggedUser } = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = async () => {
    await apiRequest('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const { user: updatedUser } = await apiRequest('/api/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    setUser(updatedUser);
    return updatedUser;
  };

  const updatePassword = async ({ currentPassword, newPassword }) => {
    await apiRequest('/api/auth/password', {
      method: 'PATCH',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  };

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
      signup,
      login,
      logout,
      updateProfile,
      updatePassword,
    }),
    [user, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}
