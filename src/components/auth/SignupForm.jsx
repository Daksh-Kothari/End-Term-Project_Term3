import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import { toast } from 'react-toastify';

export default function SignupForm() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setError('All fields required.');
    if (form.password.length < 6) return setError('Password must be 6+ characters.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    try {
      await signup(form.email, form.password, form.name);
      toast.success('Account created! 🎉');
      navigate('/dashboard');
    } catch (err) { setError(err.message); }
  };

  const inputCls = 'w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all';

  return (
    <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl text-sm text-rose-600 dark:text-rose-400">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Full Name</label>
        <div className="relative">
          <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
        <div className="relative">
          <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
        <div className="relative">
          <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-12 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 cursor-pointer">
            {showPw ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Confirm Password</label>
        <div className="relative">
          <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="••••••••" className={inputCls} />
        </div>
      </div>

      <Button type="submit" fullWidth size="lg" loading={loading}>Create Account</Button>

      <p className="text-center text-sm text-surface-500">
        Already have an account? <Link to="/login" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Sign in</Link>
      </p>
    </motion.form>
  );
}
