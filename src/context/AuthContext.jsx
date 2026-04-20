import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load user:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  const signup = useCallback(async (email, password, displayName) => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));

      // Check if email already exists
      const users = JSON.parse(localStorage.getItem('studyvault_all_users') || '[]');
      if (users.find((u) => u.email === email)) {
        throw new Error('An account with this email already exists.');
      }

      const newUser = {
        uid: 'user_' + Date.now(),
        email,
        displayName,
        avatar: null,
        subjects: [],
        createdAt: new Date().toISOString(),
        stats: {
          totalResources: 0,
          totalStudyHours: 0,
          quizzesTaken: 0,
          avgScore: 0,
        },
      };

      users.push({ ...newUser, password });
      localStorage.setItem('studyvault_all_users', JSON.stringify(users));
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));

      const users = JSON.parse(localStorage.getItem('studyvault_all_users') || '[]');
      const found = users.find((u) => u.email === email && u.password === password);

      if (!found) {
        throw new Error('Invalid email or password.');
      }

      const { password: _, ...userData } = found;
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  }, []);

  const value = useMemo(
    () => ({ user, loading, signup, login, logout, updateProfile }),
    [user, loading, signup, login, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
