import { motion } from 'framer-motion';
import { HiOutlineCheck, HiOutlineTrash } from 'react-icons/hi';
import { calcPercent, formatDate } from '../../utils/helpers';

export default function GoalCard({ goal, onToggle, onDelete, index = 0 }) {
  const progress = calcPercent(goal.completedHours, goal.targetHours);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 rounded-xl border-2 transition-all ${
        goal.isCompleted
          ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/10'
          : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle?.(goal.id)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer ${
            goal.isCompleted
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-surface-300 dark:border-surface-600 hover:border-primary-500'
          }`}
        >
          {goal.isCompleted && <HiOutlineCheck className="w-3 h-3" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${goal.isCompleted ? 'line-through text-surface-400' : 'text-surface-800 dark:text-surface-200'}`}>
            {goal.title}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-surface-400">
            <span>{goal.subject}</span>
            <span>Due: {formatDate(goal.targetDate)}</span>
          </div>
          {/* Progress bar */}
          <div className="mt-2.5">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-surface-500">{goal.completedHours}h / {goal.targetHours}h</span>
              <span className="font-medium text-surface-600 dark:text-surface-300">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface-100 dark:bg-surface-700 rounded-full">
              <motion.div
                className="h-full rounded-full bg-primary-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
        <button onClick={() => onDelete?.(goal.id)} className="p-1 text-surface-300 hover:text-rose-500 cursor-pointer">
          <HiOutlineTrash className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
