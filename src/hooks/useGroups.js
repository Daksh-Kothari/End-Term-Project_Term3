import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId, generateInviteCode } from '../utils/helpers';
import { useAuth } from './useAuth';

/**
 * Custom hook for study group CRUD operations
 */
export function useGroups() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GROUPS);
      if (stored) setGroups(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to load groups:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
    }
  }, [groups, loading]);

  const createGroup = useCallback(
    (data) => {
      const newGroup = {
        ...data,
        id: generateId(),
        createdBy: user?.uid,
        members: [user?.uid],
        memberCount: 1,
        inviteCode: generateInviteCode(),
        createdAt: new Date().toISOString(),
      };
      setGroups((prev) => [newGroup, ...prev]);
      return newGroup;
    },
    [user]
  );

  const updateGroup = useCallback((id, updates) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
  }, []);

  const deleteGroup = useCallback((id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const joinGroup = useCallback(
    (inviteCode) => {
      if (!user) return null;
      const group = groups.find((g) => g.inviteCode === inviteCode);
      if (!group) return null;
      if (group.members.includes(user.uid)) return group;

      const updated = {
        ...group,
        members: [...group.members, user.uid],
        memberCount: group.memberCount + 1,
      };
      setGroups((prev) => prev.map((g) => (g.id === group.id ? updated : g)));
      return updated;
    },
    [groups, user]
  );

  const leaveGroup = useCallback(
    (id) => {
      if (!user) return;
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id !== id) return g;
          const members = g.members.filter((m) => m !== user.uid);
          return { ...g, members, memberCount: members.length };
        })
      );
    },
    [user]
  );

  // Only show groups the user is a member of (or public groups)
  const myGroups = groups.filter(
    (g) => g.members?.includes(user?.uid)
  );

  const publicGroups = groups.filter(
    (g) => g.isPublic && !g.members?.includes(user?.uid)
  );

  return {
    groups,
    myGroups,
    publicGroups,
    loading,
    createGroup,
    updateGroup,
    deleteGroup,
    joinGroup,
    leaveGroup,
  };
}
