import { motion } from 'framer-motion';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';
import Button from '../ui/Button';

export default function QuizResults({ results, onRetry, onNewQuiz }) {
  if (!results) return null;

  const { score, total, percentage, results: answers } = results;
  const emoji = percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : percentage >= 40 ? '📚' : '💪';

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
      {/* Score card */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-card ring-1 ring-surface-200 dark:ring-surface-700 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, delay: 0.2 }}
          className="text-6xl mb-4"
        >
          {emoji}
        </motion.div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">
          Quiz Complete!
        </h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-4xl font-black gradient-text">{percentage}%</span>
        </div>
        <p className="text-surface-500 dark:text-surface-400">
          You got <span className="font-semibold text-surface-700 dark:text-surface-200">{score}</span> out of <span className="font-semibold text-surface-700 dark:text-surface-200">{total}</span> correct
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Button variant="outline" onClick={onRetry}>Retry Quiz</Button>
          <Button onClick={onNewQuiz}>New Quiz</Button>
        </div>
      </div>

      {/* Answer review */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Answer Review</h3>
        {answers.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`p-4 rounded-xl border-2 ${
              a.isCorrect
                ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20'
                : 'border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-900/20'
            }`}
          >
            <div className="flex items-start gap-3">
              {a.isCorrect ? (
                <HiOutlineCheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              ) : (
                <HiOutlineXCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-surface-800 dark:text-surface-200 whitespace-pre-line">{a.question}</p>
                <p className="text-xs mt-1.5">
                  <span className="text-surface-500">Your answer: </span>
                  <span className={a.isCorrect ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-rose-600 dark:text-rose-400 font-medium'}>
                    {a.userAnswer || '(no answer)'}
                  </span>
                </p>
                {!a.isCorrect && (
                  <p className="text-xs mt-1">
                    <span className="text-surface-500">Correct: </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{a.correctAnswer}</span>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
