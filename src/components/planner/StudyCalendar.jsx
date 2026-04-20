import { useMemo } from 'react';
import { motion } from 'framer-motion';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function StudyCalendar({ sessions = [], goals = [] }) {
  const calendarData = useMemo(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    // Count study minutes per day
    const dayMinutes = {};
    sessions.forEach((s) => {
      const d = new Date(s.date);
      if (d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
        const key = d.getDate();
        dayMinutes[key] = (dayMinutes[key] || 0) + (s.duration || 0);
      }
    });

    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, minutes: dayMinutes[d] || 0, isToday: d === today.getDate() });
    }
    return days;
  }, [sessions]);

  const getIntensity = (minutes) => {
    if (minutes === 0) return 'bg-surface-100 dark:bg-surface-800';
    if (minutes < 30) return 'bg-primary-100 dark:bg-primary-900/30';
    if (minutes < 60) return 'bg-primary-200 dark:bg-primary-800/40';
    if (minutes < 120) return 'bg-primary-300 dark:bg-primary-700/50';
    return 'bg-primary-500 dark:bg-primary-600';
  };

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl p-5 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
        Study Calendar — {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </h3>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-surface-400 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarData.map((d, i) => (
          <motion.div
            key={i}
            whileHover={d ? { scale: 1.15 } : {}}
            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
              d
                ? `${getIntensity(d.minutes)} ${d.isToday ? 'ring-2 ring-primary-500' : ''} cursor-pointer text-surface-700 dark:text-surface-300`
                : ''
            }`}
            title={d ? `${d.day}: ${d.minutes}min studied` : ''}
          >
            {d?.day}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 justify-end">
        <span className="text-xs text-surface-400">Less</span>
        {['bg-surface-100 dark:bg-surface-800', 'bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-500'].map((c, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span className="text-xs text-surface-400">More</span>
      </div>
    </div>
  );
}
