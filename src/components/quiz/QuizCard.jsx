import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function QuizCard({ question, answer, onAnswer, questionNumber, total }) {
  const [selected, setSelected] = useState(answer || '');
  const [textInput, setTextInput] = useState(answer || '');

  const handleSelect = (opt) => {
    setSelected(opt);
    onAnswer(question.id, opt);
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) onAnswer(question.id, textInput.trim());
  };

  const typeLabel = { fill_blank: 'Fill in the Blank', true_false: 'True or False', multiple_choice: 'Multiple Choice' };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
          {typeLabel[question.type]}
        </span>
        <span className="text-sm text-surface-500">
          {questionNumber} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-surface-100 dark:bg-surface-700 rounded-full mb-6">
        <motion.div
          className="h-full bg-primary-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <p className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-6 whitespace-pre-line">
        {question.question}
      </p>

      {/* Answer input */}
      {question.type === 'fill_blank' ? (
        <div className="space-y-3">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onBlur={handleTextSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
            placeholder="Type your answer..."
            className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border-2 border-surface-200 dark:border-surface-600 rounded-xl text-surface-900 dark:text-surface-100 focus:outline-none focus:border-primary-500 transition-all"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {question.options.map((opt) => (
            <motion.button
              key={opt}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelect(opt)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                selected === opt
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-surface-200 dark:border-surface-600 hover:border-surface-300 dark:hover:border-surface-500 text-surface-700 dark:text-surface-300'
              }`}
            >
              <span className="text-sm font-medium">{opt}</span>
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
