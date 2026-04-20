import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { HiOutlineLightBulb, HiOutlineSparkles } from 'react-icons/hi';

export default function QuizGenerator({ onGenerate, generating }) {
  const [text, setText] = useState('');
  const [maxQ, setMaxQ] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length < 50) return;
    onGenerate(text, maxQ);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
          <HiOutlineLightBulb className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-surface-900 dark:text-surface-100">AI Quiz Generator</h2>
          <p className="text-sm text-surface-500">Paste your notes and generate practice questions instantly</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Your Notes / Study Material</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Paste your study notes here... (minimum 50 characters)&#10;&#10;Example: Photosynthesis is the process by which green plants convert sunlight into chemical energy. The process takes place in the chloroplasts, specifically using the pigment chlorophyll..."
            className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
          />
          <p className="text-xs text-surface-400 mt-1">{text.length} characters {text.length < 50 && text.length > 0 ? '(need at least 50)' : ''}</p>
        </div>

        <div className="flex items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Max Questions</label>
            <select value={maxQ} onChange={(e) => setMaxQ(Number(e.target.value))} className="px-3 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-surface-900 dark:text-surface-100">
              {[5, 10, 15, 20].map((n) => <option key={n} value={n}>{n} questions</option>)}
            </select>
          </div>
          <Button type="submit" icon={HiOutlineSparkles} loading={generating} disabled={text.trim().length < 50}>
            Generate Quiz
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
