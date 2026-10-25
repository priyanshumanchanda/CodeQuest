import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { readStorage, writeStorage } from '../utils/storage';
import defaultUsers from '../data/users.json';

const AuthContext = createContext(null);
const USERS_KEY = 'codequest_users';
const CURRENT_USER_KEY = 'codequest_auth_user';

// Built-in fallback accounts so any of these test credentials always work
const FALLBACK_ACCOUNTS = [
  {
    id: 'usr_alex',
    fullName: 'Alex Rivera',
    email: 'alex.rivera@codequest.io',
    password: 'password123',
    role: 'Software Engineer',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr_demo',
    fullName: 'Demo User',
    email: 'demo@codequest.dev',
    password: 'demo123',
    role: 'Software Engineer',
    createdAt: new Date().toISOString(),
  },
];

function getMergedUsers() {
  const stored = readStorage(USERS_KEY, []) || [];
  const map = new Map();

  // Add fallback accounts
  FALLBACK_ACCOUNTS.forEach((u) => {
    map.set(u.email.toLowerCase(), u);
  });

  // Add stored users from past signups
  stored.forEach((u) => {
    if (u && u.email) {
      map.set(u.email.toLowerCase(), u);
    }
  });

  // Load users from users.json (takes priority)
  (defaultUsers || []).forEach((u) => {
    if (u && u.email) {
      map.set(u.email.toLowerCase(), u);
    }
  });

  return Array.from(map.values());
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return (
      readStorage(CURRENT_USER_KEY, null) ||
      readStorage('codequest-demo-current-user', null)
    );
  });

  const [usersList, setUsersList] = useState(() => getMergedUsers());

  // Keep usersList in sync
  useEffect(() => {
    const merged = getMergedUsers();
    setUsersList(merged);
    writeStorage(USERS_KEY, merged);
  }, []);

  const signup = ({ fullName, email, password }) => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !password) {
      throw new Error('Please fill in all required fields.');
    }

    const currentUsers = getMergedUsers();
    const exists = currentUsers.some(
      (item) => item.email.toLowerCase() === trimmedEmail
    );

    if (exists) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `usr_${crypto.randomUUID().slice(0, 8)}`,
      fullName: trimmedName,
      email: trimmedEmail,
      password,
      role: 'Software Engineer',
      createdAt: new Date().toISOString(),
    };

    const nextUsers = [...currentUsers, newUser];
    setUsersList(nextUsers);
    writeStorage(USERS_KEY, nextUsers);
    writeStorage(CURRENT_USER_KEY, newUser);
    setUser(newUser);
    return newUser;
  };

  const login = ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = String(password).trim();
    const currentUsers = getMergedUsers();

    const foundUser =
      currentUsers.find(
        (item) =>
          item.email.toLowerCase() === cleanEmail &&
          String(item.password).trim() === cleanPassword
      ) ||
      defaultUsers.find(
        (item) =>
          item.email.toLowerCase() === cleanEmail &&
          String(item.password).trim() === cleanPassword
      );

    if (!foundUser) {
      throw new Error('Invalid email or password. Please verify your credentials or sign up.');
    }

    // Immediately persist session synchronously to prevent race conditions during navigation
    writeStorage(CURRENT_USER_KEY, foundUser);
    setUser(foundUser);
    return foundUser;
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem('codequest-demo-current-user');
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser((current) => {
      if (!current) return current;

      const nextUser = { ...current, ...updates };
      const currentUsers = getMergedUsers();
      const nextList = currentUsers.map((item) =>
        item.email.toLowerCase() === current.email.toLowerCase() ? nextUser : item
      );
      setUsersList(nextList);
      writeStorage(USERS_KEY, nextList);
      writeStorage(CURRENT_USER_KEY, nextUser);
      return nextUser;
    });
  };

  const value = useMemo(
    () => ({
      user,
      usersList,
      isAuthenticated: Boolean(user),
      signup,
      login,
      logout,
      updateProfile,
    }),
    [user, usersList]
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
