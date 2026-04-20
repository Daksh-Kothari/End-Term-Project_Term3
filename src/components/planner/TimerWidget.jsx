import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { HiOutlinePlay, HiOutlinePause, HiOutlineRefresh } from 'react-icons/hi';
import { SUBJECTS } from '../../utils/constants';

export default function TimerWidget({ timer }) {
  const {
    formattedTime, isRunning, mode, progress, sessionsCompleted,
    currentSubject, setCurrentSubject, start, pause, reset, switchMode,
  } = timer;

  const modes = [
    { key: 'work', label: 'Focus' },
    { key: 'shortBreak', label: 'Short Break' },
    { key: 'longBreak', label: 'Long Break' },
  ];

  // Circular progress
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Study Timer</h3>

      {/* Mode tabs */}
      <div className="flex bg-surface-100 dark:bg-surface-900 rounded-xl p-1 mb-6">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => switchMode(m.key)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              mode === m.key
                ? 'bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-surface-500 hover:text-surface-700'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Circular timer */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width="200" height="200" className="-rotate-90">
            <circle cx="100" cy="100" r={radius} fill="none" stroke="currentColor"
              className="text-surface-100 dark:text-surface-700" strokeWidth="6" />
            <motion.circle
              cx="100" cy="100" r={radius} fill="none" stroke="url(#timerGradient)"
              strokeWidth="6" strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-surface-900 dark:text-surface-100 font-mono">
              {formattedTime}
            </span>
            <span className="text-xs text-surface-400 mt-1 capitalize">{mode === 'work' ? 'Focus Time' : mode.replace(/([A-Z])/g, ' $1')}</span>
          </div>
        </div>
      </div>

      {/* Subject select */}
      <select
        value={currentSubject}
        onChange={(e) => setCurrentSubject(e.target.value)}
        className="w-full px-3 py-2 mb-4 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-surface-700 dark:text-surface-300"
      >
        <option value="">Select subject (optional)</option>
        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button variant="ghost" size="sm" onClick={reset} icon={HiOutlineRefresh}>Reset</Button>
        {isRunning ? (
          <Button size="lg" onClick={pause} icon={HiOutlinePause} className="px-8">Pause</Button>
        ) : (
          <Button size="lg" onClick={start} icon={HiOutlinePlay} className="px-8">Start</Button>
        )}
      </div>

      {/* Sessions counter */}
      <p className="text-center text-xs text-surface-400 mt-4">
        Sessions completed today: <span className="font-semibold text-surface-600 dark:text-surface-300">{sessionsCompleted}</span>
      </p>
    </div>
  );
}
