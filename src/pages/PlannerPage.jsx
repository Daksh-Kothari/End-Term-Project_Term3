import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlus } from 'react-icons/hi';
import StudyCalendar from '../components/planner/StudyCalendar';
import GoalCard from '../components/planner/GoalCard';
import TimerWidget from '../components/planner/TimerWidget';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { useStudyTimer } from '../hooks/useStudyTimer';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS, SUBJECTS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { HiOutlineCalendar } from 'react-icons/hi';

export default function PlannerPage() {
  const { user } = useAuth();
  const timer = useStudyTimer();
  const [goals, setGoals] = useLocalStorage(STORAGE_KEYS.GOALS, []);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalForm, setGoalForm] = useState({ title: '', subject: '', targetHours: 10, targetDate: '' });

  const sessions = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]').filter((s) => s.userId === user?.uid); }
    catch { return []; }
  }, [user]);

  const myGoals = useMemo(() => goals.filter((g) => g.userId === user?.uid), [goals, user]);

  const handleAddGoal = useCallback((e) => {
    e.preventDefault();
    const newGoal = {
      ...goalForm,
      id: generateId(),
      userId: user?.uid,
      targetHours: Number(goalForm.targetHours),
      completedHours: 0,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) => [newGoal, ...prev]);
    setGoalForm({ title: '', subject: '', targetHours: 10, targetDate: '' });
    setShowGoalForm(false);
  }, [goalForm, user, setGoals]);

  const toggleGoal = useCallback((id) => {
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, isCompleted: !g.isCompleted } : g));
  }, [setGoals]);

  const deleteGoal = useCallback((id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, [setGoals]);

  const inputCls = 'w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Study Planner</h1>
        <p className="text-surface-500 text-sm mt-1">Plan your study sessions and track your goals</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Calendar + Goals */}
        <div className="lg:col-span-2 space-y-6">
          <StudyCalendar sessions={sessions} />

          {/* Goals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Study Goals</h2>
              <Button size="sm" icon={HiOutlinePlus} onClick={() => setShowGoalForm(true)}>Add Goal</Button>
            </div>
            {myGoals.length === 0 ? (
              <EmptyState icon={HiOutlineCalendar} title="No goals set" description="Set study goals to stay on track." />
            ) : (
              <div className="space-y-3">
                {myGoals.map((g, i) => <GoalCard key={g.id} goal={g} onToggle={toggleGoal} onDelete={deleteGoal} index={i} />)}
              </div>
            )}
          </div>
        </div>

        {/* Right: Timer */}
        <div>
          <TimerWidget timer={timer} />
        </div>
      </div>

      {/* Add Goal Modal */}
      <Modal isOpen={showGoalForm} onClose={() => setShowGoalForm(false)} title="Add Study Goal">
        <form onSubmit={handleAddGoal} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Goal Title *</label>
            <input value={goalForm.title} onChange={(e) => setGoalForm((p) => ({ ...p, title: e.target.value }))} required placeholder="e.g. Finish Chapter 5" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Subject</label>
              <select value={goalForm.subject} onChange={(e) => setGoalForm((p) => ({ ...p, subject: e.target.value }))} className={inputCls}>
                <option value="">Select</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Target Hours</label>
              <input type="number" min="1" value={goalForm.targetHours} onChange={(e) => setGoalForm((p) => ({ ...p, targetHours: e.target.value }))} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Due Date</label>
            <input type="date" value={goalForm.targetDate} onChange={(e) => setGoalForm((p) => ({ ...p, targetDate: e.target.value }))} className={inputCls} />
          </div>
          <Button type="submit" fullWidth>Add Goal</Button>
        </form>
      </Modal>
    </div>
  );
}
