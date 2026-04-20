import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Button component with variants and animations
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    fullWidth = false,
    className = '',
    ...props
  },
  ref
) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg',
    secondary:
      'bg-surface-100 text-surface-700 hover:bg-surface-200 focus:ring-surface-400 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700',
    outline:
      'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/20',
    ghost:
      'text-surface-600 hover:bg-surface-100 focus:ring-surface-400 dark:text-surface-300 dark:hover:bg-surface-800',
    danger:
      'bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500 shadow-md',
    success:
      'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500 shadow-md',
  };

  const sizes = {
    xs: 'text-xs px-2.5 py-1.5 gap-1',
    sm: 'text-sm px-3 py-2 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2',
    xl: 'text-lg px-8 py-4 gap-2.5',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4" />
      )}
    </motion.button>
  );
});

export default Button;
