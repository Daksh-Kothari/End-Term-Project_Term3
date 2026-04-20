import { useContext } from 'react';
import { ResourceContext } from '../context/ResourceContext';

/**
 * Custom hook to access resource state and CRUD methods
 * Usage: const { resources, addResource, deleteResource } = useResources();
 */
export function useResources() {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
}
