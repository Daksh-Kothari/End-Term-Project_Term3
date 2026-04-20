import { useContext } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { ThemeContext } from '../../context/ThemeContext';

/**
 * Theme toggle switch with animated icon transition
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300 transition-colors cursor-pointer ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <HiOutlineSun className="w-5 h-5" />
        ) : (
          <HiOutlineMoon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
}
