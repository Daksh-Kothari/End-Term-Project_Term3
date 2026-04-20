import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const inputCls =
    'w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all';

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl text-sm text-rose-600 dark:text-rose-400"
        >
          {error}
        </motion.div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
          Email
        </label>
        <div className="relative">
          <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
          Password
        </label>
        <div className="relative">
          <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 cursor-pointer"
          >
            {showPassword ? (
              <HiOutlineEyeOff className="w-5 h-5" />
            ) : (
              <HiOutlineEye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" fullWidth size="lg" loading={loading}>
        Sign In
      </Button>

      <p className="text-center text-sm text-surface-500 dark:text-surface-400">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </motion.form>
  );
}
