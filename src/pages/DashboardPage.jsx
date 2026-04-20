import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineClock, HiOutlineFire, HiOutlinePlus, HiOutlineArrowRight } from 'react-icons/hi';
import StatCard from '../components/ui/StatCard';
import { useAuth } from '../hooks/useAuth';
import { useResources } from '../hooks/useResources';
import { getGreeting, calcStreak, formatDuration } from '../utils/helpers';
import { STORAGE_KEYS } from '../utils/constants';

export default function DashboardPage() {
  const { user } = useAuth();
  const { resources } = useResources();

  const sessions = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]').filter((s) => s.userId === user?.uid); }
    catch { return []; }
  }, [user]);

  const quizHistory = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]').filter((q) => q.userId === user?.uid); }
    catch { return []; }
  }, [user]);

  const totalStudyMinutes = useMemo(() => sessions.reduce((sum, s) => sum + (s.duration || 0), 0), [sessions]);
  const streak = useMemo(() => calcStreak(sessions), [sessions]);
  const avgScore = useMemo(() => {
    if (quizHistory.length === 0) return 0;
    return Math.round(quizHistory.reduce((sum, q) => sum + q.percentage, 0) / quizHistory.length);
  }, [quizHistory]);

  const userResources = useMemo(() => resources.filter((r) => r.userId === user?.uid), [resources, user]);

  const quickActions = [
    { icon: HiOutlinePlus, label: 'Add Resource', to: '/resources', color: 'bg-primary-500' },
    { icon: HiOutlineLightBulb, label: 'Take Quiz', to: '/quiz', color: 'bg-pink-500' },
    { icon: HiOutlineUserGroup, label: 'Study Group', to: '/groups', color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          {getGreeting()}, {user?.displayName?.split(' ')[0] || 'Student'} 👋
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">Here's your study overview for today</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiOutlineBookOpen} label="Total Resources" value={userResources.length} color="primary" />
        <StatCard icon={HiOutlineClock} label="Study Time" value={formatDuration(totalStudyMinutes)} color="emerald" />
        <StatCard icon={HiOutlineLightBulb} label="Avg Quiz Score" value={`${avgScore}%`} color="accent" />
        <StatCard icon={HiOutlineFire} label="Day Streak" value={streak} color="amber" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        {quickActions.map((a, i) => (
          <motion.div key={a.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <Link to={a.to} className="flex flex-col items-center gap-2 p-5 bg-white dark:bg-surface-800 rounded-2xl shadow-card hover:shadow-card-hover ring-1 ring-surface-200 dark:ring-surface-700 transition-all group">
              <div className={`w-12 h-12 rounded-xl ${a.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <a.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{a.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Resources */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Recent Resources</h2>
          <Link to="/resources" className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
            View all <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {userResources.length === 0 ? (
          <p className="text-sm text-surface-400 py-8 text-center">No resources yet. Add your first study resource!</p>
        ) : (
          <div className="space-y-3">
            {userResources.slice(0, 5).map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                <span className="text-lg">{['📝', '📄', '🎬', '📰', '🔗'][['note', 'pdf', 'video', 'article', 'link'].indexOf(r.type)] || '📝'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-800 dark:text-surface-200 truncate">{r.title}</p>
                  <p className="text-xs text-surface-400">{r.subject || 'No subject'}</p>
                </div>
                <span className="text-xs text-surface-400">{new Date(r.createdAt).toLocaleDateString()}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Quiz Scores */}
      {quizHistory.length > 0 && (
        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Recent Quiz Scores</h2>
            <Link to="/quiz" className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
              Take quiz <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-end gap-3 h-32">
            {quizHistory.slice(0, 8).map((q, i) => (
              <motion.div key={q.id} initial={{ height: 0 }} animate={{ height: `${q.percentage}%` }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className={`flex-1 rounded-t-lg min-w-0 ${q.percentage >= 70 ? 'bg-emerald-400' : q.percentage >= 40 ? 'bg-amber-400' : 'bg-rose-400'}`}
                title={`${q.percentage}%`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
