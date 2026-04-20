import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatCard from '../components/ui/StatCard';
import { useAuth } from '../hooks/useAuth';
import { useResources } from '../hooks/useResources';
import { HiOutlineClock, HiOutlineLightBulb, HiOutlineBookOpen, HiOutlineFire } from 'react-icons/hi';
import { STORAGE_KEYS, RESOURCE_TYPES } from '../utils/constants';
import { groupBy, formatDuration, calcStreak } from '../utils/helpers';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

export default function AnalyticsPage() {
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

  const userResources = useMemo(() => resources.filter((r) => r.userId === user?.uid), [resources, user]);
  const totalMinutes = useMemo(() => sessions.reduce((s, v) => s + (v.duration || 0), 0), [sessions]);
  const streak = useMemo(() => calcStreak(sessions), [sessions]);
  const avgScore = useMemo(() => {
    if (!quizHistory.length) return 0;
    return Math.round(quizHistory.reduce((s, q) => s + q.percentage, 0) / quizHistory.length);
  }, [quizHistory]);

  const hoursBySubject = useMemo(() => {
    const grouped = groupBy(sessions, 'subject');
    return Object.entries(grouped).map(([subject, items]) => ({
      subject: subject.length > 12 ? subject.slice(0, 12) + '…' : subject,
      minutes: items.reduce((s, v) => s + (v.duration || 0), 0),
    })).sort((a, b) => b.minutes - a.minutes).slice(0, 7);
  }, [sessions]);

  const resourceDist = useMemo(() => {
    const grouped = groupBy(userResources, 'type');
    return Object.entries(grouped).map(([type, items]) => ({
      name: RESOURCE_TYPES.find((t) => t.value === type)?.label || type,
      value: items.length,
    }));
  }, [userResources]);

  const scoreTrend = useMemo(() => quizHistory.slice(0, 10).reverse().map((q, i) => ({ quiz: `Q${i + 1}`, score: q.percentage })), [quizHistory]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Analytics</h1>
        <p className="text-surface-500 text-sm mt-1">Your study progress at a glance</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiOutlineClock} label="Total Study Time" value={formatDuration(totalMinutes)} color="primary" />
        <StatCard icon={HiOutlineBookOpen} label="Resources" value={userResources.length} color="emerald" />
        <StatCard icon={HiOutlineLightBulb} label="Quizzes Taken" value={quizHistory.length} color="accent" />
        <StatCard icon={HiOutlineFire} label="Day Streak" value={streak} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">
          <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100 mb-4">Study Time by Subject</h3>
          {hoursBySubject.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hoursBySubject}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="minutes" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-sm text-surface-400 text-center py-16">Start studying to see data</p>}
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">
          <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100 mb-4">Quiz Score Trend</h3>
          {scoreTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={scoreTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="quiz" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#ec4899" strokeWidth={3} dot={{ r: 5, fill: '#ec4899' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <p className="text-sm text-surface-400 text-center py-16">Take quizzes to see trends</p>}
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">
          <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100 mb-4">Resource Types</h3>
          {resourceDist.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={resourceDist} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {resourceDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-sm text-surface-400 text-center py-16">Add resources to see data</p>}
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700 flex flex-col items-center justify-center">
          <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100 mb-6">Average Quiz Score</h3>
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" className="text-surface-100 dark:text-surface-700" strokeWidth="8" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`} strokeDashoffset={`${2 * Math.PI * 50 * (1 - avgScore / 100)}`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-surface-900 dark:text-surface-100">{avgScore}%</span>
            </div>
          </div>
          <p className="text-sm text-surface-500 mt-4">Across {quizHistory.length} quizzes</p>
        </div>
      </div>
    </div>
  );
}
