import { motion } from 'framer-motion';

/**
 * Animated loading spinner with optional text
 */
export default function LoadingSpinner({ size = 'md', text = '', className = '' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} rounded-full border-3 border-surface-200 border-t-primary-500 dark:border-surface-700 dark:border-t-primary-400`}
      />
      {text && (
        <p className="text-sm text-surface-500 dark:text-surface-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
