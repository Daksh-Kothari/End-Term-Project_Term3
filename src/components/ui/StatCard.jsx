import { motion } from 'framer-motion';

/**
 * Stat display card with icon, value, label, and optional trend
 */
export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color = 'primary',
  className = '',
}) {
  const colorMap = {
    primary: {
      bg: 'bg-primary-100 dark:bg-primary-900/30',
      icon: 'text-primary-600 dark:text-primary-400',
      ring: 'ring-primary-200 dark:ring-primary-800',
    },
    accent: {
      bg: 'bg-pink-100 dark:bg-pink-900/30',
      icon: 'text-pink-600 dark:text-pink-400',
      ring: 'ring-pink-200 dark:ring-pink-800',
    },
    emerald: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      icon: 'text-emerald-600 dark:text-emerald-400',
      ring: 'ring-emerald-200 dark:ring-emerald-800',
    },
    amber: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      icon: 'text-amber-600 dark:text-amber-400',
      ring: 'ring-amber-200 dark:ring-amber-800',
    },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`bg-white dark:bg-surface-800 rounded-2xl p-5 shadow-card hover:shadow-card-hover ring-1 ${colors.ring} transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          {Icon && <Icon className={`w-6 h-6 ${colors.icon}`} />}
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend > 0
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
            }`}
          >
            {trend > 0 ? '+' : ''}
            {trend}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">
          {value}
        </p>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
          {label}
        </p>
      </div>
    </motion.div>
  );
}
