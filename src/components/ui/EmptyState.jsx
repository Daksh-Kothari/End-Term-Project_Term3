import { motion } from 'framer-motion';

/**
 * Empty state display with icon, title, description, and optional action
 */
export default function EmptyState({
  icon: Icon,
  title = 'Nothing here yet',
  description = '',
  action,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      {Icon && (
        <div className="w-20 h-20 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6">
          <Icon className="w-10 h-10 text-primary-500" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-surface-500 dark:text-surface-400 max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </motion.div>
  );
}
