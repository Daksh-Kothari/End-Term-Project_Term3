import { motion } from 'framer-motion';
import { HiOutlineTrendingUp } from 'react-icons/hi';
import EmptyState from '../ui/EmptyState';

export default function QuizHistory({ history }) {
  if (!history || history.length === 0) {
    return <EmptyState icon={HiOutlineTrendingUp} title="No quiz history" description="Take your first quiz to see your progress here." />;
  }

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Quiz History</h3>
      <div className="space-y-3">
        {history.slice(0, 10).map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-3 rounded-xl bg-surface-50 dark:bg-surface-900"
          >
            <div>
              <p className="text-sm font-medium text-surface-800 dark:text-surface-200">{q.title}</p>
              <p className="text-xs text-surface-400">{new Date(q.completedAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <span className={`text-lg font-bold ${q.percentage >= 70 ? 'text-emerald-500' : q.percentage >= 40 ? 'text-amber-500' : 'text-rose-500'}`}>
                {q.percentage}%
              </span>
              <p className="text-xs text-surface-400">{q.score}/{q.total}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
