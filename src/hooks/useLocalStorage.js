import { useState, useEffect } from 'react';

/**
 * Custom hook for syncing state with localStorage
 * Usage: const [value, setValue] = useLocalStorage('key', defaultValue);
 *
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Default value if nothing stored
 * @returns {[*, Function]} Stateful value and setter
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
