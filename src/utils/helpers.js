// Utility / helper functions

import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique ID
 */
export const generateId = () => uuidv4();

/**
 * Format a date to a readable string
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format a date to relative time (e.g. "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const now = new Date();
  const d = new Date(date);
  const diff = now - d;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
};

/**
 * Format minutes to a readable duration (e.g. "2h 30m")
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes <= 0) return '0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Get initials from a name
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generate a random pastel color
 */
export const randomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

/**
 * Calculate percentage
 */
export const calcPercent = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Group an array by a key
 */
export const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    const group = item[key] || 'Other';
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {});
};

/**
 * Get a greeting based on time of day
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Deep clone an object
 */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Generate a short invite code
 */
export const generateInviteCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

/**
 * Calculate study streak (consecutive days)
 */
export const calcStreak = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const uniqueDays = [...new Set(
    sessions.map((s) => {
      const d = new Date(s.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
  )].sort((a, b) => b - a);

  let streak = 0;
  let checkDate = today.getTime();

  for (const day of uniqueDays) {
    if (day === checkDate) {
      streak++;
      checkDate -= 86400000; // subtract one day
    } else if (day < checkDate) {
      break;
    }
  }

  return streak;
};
