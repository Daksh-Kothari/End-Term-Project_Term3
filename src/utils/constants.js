// Application-wide constants

export const APP_NAME = 'StudyVault';
export const APP_TAGLINE = 'Your Intelligent Study Companion';

// Resource types
export const RESOURCE_TYPES = [
  { value: 'note', label: 'Note', icon: '📝', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { value: 'pdf', label: 'PDF', icon: '📄', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  { value: 'video', label: 'Video', icon: '🎬', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { value: 'article', label: 'Article', icon: '📰', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  { value: 'link', label: 'Link', icon: '🔗', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
];

// Default subjects
export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'History',
  'Economics',
  'Psychology',
  'Philosophy',
  'Engineering',
  'Business',
  'Art & Design',
  'Music',
  'Other',
];

// Quiz question types
export const QUIZ_TYPES = {
  FILL_BLANK: 'fill_blank',
  TRUE_FALSE: 'true_false',
  MULTIPLE_CHOICE: 'multiple_choice',
};

// Study session types
export const SESSION_TYPES = [
  { value: 'reading', label: 'Reading', icon: '📖', color: '#6366f1' },
  { value: 'quiz', label: 'Quiz Practice', icon: '🧠', color: '#ec4899' },
  { value: 'review', label: 'Review', icon: '🔄', color: '#10b981' },
  { value: 'notes', label: 'Note Taking', icon: '✍️', color: '#f59e0b' },
];

// Navigation items
export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'HiOutlineHome' },
  { path: '/resources', label: 'Resources', icon: 'HiOutlineBookOpen' },
  { path: '/quiz', label: 'AI Quiz', icon: 'HiOutlineLightBulb' },
  { path: '/groups', label: 'Study Groups', icon: 'HiOutlineUserGroup' },
  { path: '/planner', label: 'Planner', icon: 'HiOutlineCalendar' },
  { path: '/analytics', label: 'Analytics', icon: 'HiOutlineChartBar' },
];

// Storage keys
export const STORAGE_KEYS = {
  THEME: 'studyvault_theme',
  USER: 'studyvault_user',
  RESOURCES: 'studyvault_resources',
  GROUPS: 'studyvault_groups',
  QUIZZES: 'studyvault_quizzes',
  SESSIONS: 'studyvault_sessions',
  GOALS: 'studyvault_goals',
};

// Pomodoro timer defaults (in minutes)
export const TIMER_DEFAULTS = {
  WORK: 25,
  SHORT_BREAK: 5,
  LONG_BREAK: 15,
};
