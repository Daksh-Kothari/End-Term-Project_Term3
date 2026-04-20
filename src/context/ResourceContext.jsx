import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { AuthContext } from './AuthContext';
import { generateId } from '../utils/helpers';

export const ResourceContext = createContext(null);

export function ResourceProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    subject: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Load resources from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESOURCES);
      if (stored) {
        setResources(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load resources:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist resources
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
    }
  }, [resources, loading]);

  const addResource = useCallback(
    (data) => {
      const newResource = {
        ...data,
        id: generateId(),
        userId: user?.uid,
        rating: 0,
        ratingCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setResources((prev) => [newResource, ...prev]);
      return newResource;
    },
    [user]
  );

  const updateResource = useCallback((id, updates) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, ...updates, updatedAt: new Date().toISOString() }
          : r
      )
    );
  }, []);

  const deleteResource = useCallback((id) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const rateResource = useCallback((id, rating) => {
    setResources((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const newCount = r.ratingCount + 1;
        const newRating = ((r.rating * r.ratingCount) + rating) / newCount;
        return { ...r, rating: Math.round(newRating * 10) / 10, ratingCount: newCount };
      })
    );
  }, []);

  // Filtered and sorted resources
  const filteredResources = useMemo(() => {
    let result = [...resources];

    // Filter by user ownership (show user's + group resources)
    if (user) {
      result = result.filter(
        (r) => r.userId === user.uid || r.groupId
      );
    }

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.subject?.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Type filter
    if (filters.type) {
      result = result.filter((r) => r.type === filters.type);
    }

    // Subject filter
    if (filters.subject) {
      result = result.filter((r) => r.subject === filters.subject);
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[filters.sortBy];
      let bVal = b[filters.sortBy];

      if (filters.sortBy === 'title') {
        aVal = aVal?.toLowerCase() || '';
        bVal = bVal?.toLowerCase() || '';
      }

      if (aVal < bVal) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [resources, filters, user]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      type: '',
      subject: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  }, []);

  const value = useMemo(
    () => ({
      resources,
      filteredResources,
      loading,
      filters,
      addResource,
      updateResource,
      deleteResource,
      rateResource,
      updateFilters,
      clearFilters,
    }),
    [
      resources,
      filteredResources,
      loading,
      filters,
      addResource,
      updateResource,
      deleteResource,
      rateResource,
      updateFilters,
      clearFilters,
    ]
  );

  return (
    <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>
  );
}
