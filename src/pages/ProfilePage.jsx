import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlineSave } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import { SUBJECTS } from '../utils/constants';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    subjects: user?.subjects || [],
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleSubject = (subject) => {
    setForm((p) => ({
      ...p,
      subjects: p.subjects.includes(subject)
        ? p.subjects.filter((s) => s !== subject)
        : [...p.subjects, subject],
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    toast.success('Profile updated! ✨');
  };

  const inputCls = 'w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Profile Settings</h1>
        <p className="text-surface-500 text-sm mt-1">Manage your account</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card ring-1 ring-surface-200 dark:ring-surface-700">

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {user?.displayName?.[0]?.toUpperCase() || 'S'}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">{user?.displayName}</h2>
            <p className="text-sm text-surface-500">{user?.email}</p>
            <p className="text-xs text-surface-400 mt-1">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Display Name</label>
            <div className="relative">
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input name="displayName" value={form.displayName} onChange={handleChange} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input name="email" value={form.email} onChange={handleChange} disabled className={`${inputCls} opacity-60 cursor-not-allowed`} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Your Subjects</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button key={s} type="button" onClick={() => toggleSubject(s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                    form.subjects.includes(s)
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 ring-1 ring-primary-300'
                      : 'bg-surface-100 text-surface-500 dark:bg-surface-700 dark:text-surface-400 hover:bg-surface-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" icon={HiOutlineSave}>Save Changes</Button>
        </form>
      </motion.div>
    </div>
  );
}
